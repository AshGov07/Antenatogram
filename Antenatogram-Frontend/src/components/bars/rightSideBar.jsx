import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Avatar, Button } from "flowbite-react";
import useSignOut from "../../hooks/useSignOut";
import axios from "../../api/axios";

const Sidebar = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: "Mrs. Saanvi Patel",
    age: 33,
    estimatedDate: "12/09/2024",
    correctedDate: "22/09/2024",
    riskLevel: "MEDIUM",
    riskDescription: [
      "GTT results show higher blood sugar content.",
      "Patient appears to be borderline anaemic.",
    ],
  });

  const [showPrescription, setShowPrescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const { auth } = useAuth();
  const signOutHandler = useSignOut();
  const navigate = useNavigate();

  const handleViewPrescription = () => {
    setShowPrescription((prevShow) => !prevShow);
  };

  const handleModalToggle = () => {
    setShowModal((prevShow) => !prevShow);
  };

  // Function to generate shareable link
  const handleShare = async () => {
    setCopySuccess("");
    setShareLink(""); // Clear previous link
    try {
      const patientId = auth.userid || auth.patient_id;
      if (!patientId) {
        setCopySuccess("Patient ID not found. Please login again.");
        return;
      }
      const expiryDate = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString();

      // Use the configured axios instance from api/axios.js
      const res = await axios.post(
        `/api/patients/${patientId}/share`,
        {
          expiryDate,
        }
      );

      if (res.data && res.data.link) {
        setShareLink(`${window.location.origin}/shared/${res.data.link}`);
        setCopySuccess(""); // Clear any previous error
      } else {
        setCopySuccess("Failed to generate link (no link in response)");
        setShareLink("");
      }
    } catch (err) {
      console.error("Share link error:", err);
      setShareLink("");
      setCopySuccess(`Failed to generate link: ${err.message}`);
    }
  };

  // Function to copy link to clipboard
  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopySuccess("Copied!");
    }
  };

  return (
    <div className="h-11/12 z-0 top-1/12 w-full bg-white text-black relative overflow-y-auto">
      <div className="px-4 space-y-6 flex flex-col justify-around h-full">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          {/* Back Button for doctor to go back to patient list */}
          {auth.role === "doctor" && (
            <button
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
              onClick={() => navigate("/patients")}
            >
              ← Back to All Patients
            </button>
          )}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <Avatar rounded />
            </div>
            <h4 className="text-lg font-bold">{patientInfo.name}</h4>
          </div>
          <div className="mt-4 text-left">
            <p>
              <strong>Age:</strong> {patientInfo.age}
            </p>
            <p>
              <strong>Estimated Date:</strong> {patientInfo.estimatedDate}
            </p>
            <p>
              <strong>Corrected Date:</strong> {patientInfo.correctedDate}
            </p>

            <Button className="mx-auto p-3 mt-4 text-sm md:text-md text-white bg-purple-700 backdrop-blur-md hover:bg-purple-800">
              <Link to="/profile" className="block w-full h-full text-white">
                View History
              </Link>
            </Button>

            <div className="bg-white py-6 px-4 rounded-lg shadow-lg w-full text-white">
              <div className="flex justify-between space-x-4 m-auto  text-sm md:text-md">
                <div className="bg-purple-700 flex-1 p-2 rounded text-center">
                  <Link to="/appointments">Appointment History</Link>
                </div>
                <div className="bg-orange-700 flex-1 m-auto py-2 px-1 rounded text-center">
                  <Link to="/files">Scans & Reports</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {auth.role === "doctor" && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold">Risk Level</h3>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 rounded p-2 mt-2 inline-block">
                <p className="font-bold">{patientInfo.riskLevel}</p>
              </div>
            </div>
            <div className="text-left mt-4">
              {patientInfo.riskDescription.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>
          </div>
        )}

        {auth.role === "patient" && (
          <div className="my-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleShare}
            >
              Share My Data
            </button>
            {shareLink && (
              <div className="mt-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="w-full p-2 border rounded mb-1"
                  onClick={handleCopy}
                  style={{ cursor: "pointer" }}
                />
                <button
                  className="text-blue-600 underline text-sm"
                  onClick={handleCopy}
                  type="button"
                >
                  Copy Link
                </button>
                {copySuccess && (
                  <span className="ml-2 text-green-600">{copySuccess}</span>
                )}
              </div>
            )}
            {!shareLink && copySuccess && (
              <div className="mt-2 text-red-600 text-sm">{copySuccess}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
