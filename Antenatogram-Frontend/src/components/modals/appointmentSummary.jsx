import { useState } from "react";
import { createPortal } from "react-dom";

const AppointmentSummaryModal = ({
  isOpen,
  setIsOpen,
  appointment,
  setAppointment,
  updateAppointment,
}) => {
  const doctor = appointment.doctor;
  const date = appointment.date;
  const location = appointment.location;
  const summary = appointment.summary;
  const prescriptionImage = appointment.prescriptionImage;
  const testdetails = appointment.testdetails;

  const [dupeAppointment, setDupeAppointment] = useState({ appointment });
  const [showPrescription, setShowPrescription] = useState(false);
  const [showTestDetails, setShowTestDetails] = useState(false);

  const handleChange = (e) => {
    setAppointment((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt === appointment ? { ...appt, summary: e.target.value } : appt
      )
    );
  };

  if (isOpen === -1) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-100">
      <div
        className="bg-white border border-gray-800 rounded-lg shadow-lg p-6"
        style={{ width: "700px", height: "400px" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Doctor Visit Summary
          </h2>
          <button
            onClick={() => {
              updateAppointment(dupeAppointment);
              setIsOpen(-1);
            }}
            className="text-gray-800 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">
            <strong>Date:</strong> {date}
          </p>
          <p className="text-gray-800">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-gray-800">
            <strong>Doctor:</strong> {doctor}
          </p>
        </div>
        <div className="mb-4 flex-grow">
          <label className="block text-gray-800 font-medium mb-2" htmlFor="summary">
            Summary:
          </label>
          <textarea
            id="summary"
            className="w-full h-full p-2 border border-gray-800 rounded-lg"
            value={summary}
            onChange={handleChange}
            style={{ resize: "none" }}
          />
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowPrescription(!showPrescription)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            {showPrescription ? "Hide Prescription" : "View Prescription"}
          </button>
          <button
            onClick={() => setShowTestDetails(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          >
            View Test Details
          </button>
        </div>

        {/* Prescription Image */}
        {showPrescription && prescriptionImage && (
          <div className="mb-4">
            <a href={prescriptionImage} target="_blank" rel="noopener noreferrer">
              {/* <img
                src={prescriptionImage}
                alt="Prescription"
                className="w-full h-auto border border-gray-800 rounded-lg"
              /> */}
            </a>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => {
              setDupeAppointment(appointment);
              setIsOpen(-1);
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Save & Close
          </button>
        </div>

        {/* Test Details Modal */}
        {showTestDetails && (
          <TestDetailsModal
            isOpen={showTestDetails}
            setIsOpen={setShowTestDetails}
            testdetails={testdetails}
          />
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

// Test Details Modal
const TestDetailsModal = ({ isOpen, setIsOpen, testdetails }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-90">
      <div
        className="bg-white border border-gray-800 rounded-lg shadow-lg p-6"
        style={{ width: "600px", height: "300px" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Test Details</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-800 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
        <div className="overflow-auto" style={{ height: "200px" }}>
          {testdetails && testdetails.length > 0 ? (
            <ul>
              {testdetails.map((test, index) => (
                <li key={index} className="mb-2">
                  <strong>Test Name:</strong> {test.name} <br />
                  <strong>Date Taken:</strong> {test.date} <br />
                  <strong>Results:</strong> {test.results} <br />
                  <strong>Comments:</strong> {test.comments}
                </li>
              ))}
            </ul>
          ) : (
            <p>No test details available.</p>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default AppointmentSummaryModal;
