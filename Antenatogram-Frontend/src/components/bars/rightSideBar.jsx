// import { Link } from "react-router-dom";
// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { Avatar, Button } from "flowbite-react";
// import useSignOut from "../../hooks/useSignOut";

// const Sidebar = () => {
//   const [patientInfo, setPatientInfo] = useState({
//     name: "Mrs. Saanvi Patel",
//     age: 33,
//     estimatedDate: "12/09/2024",
//     correctedDate: "22/09/2024",
//     riskLevel: "MEDIUM",
//     riskDescription: [
//       "GTT results show higher blood sugar content.",
//       "Patient appears to be borderline anaemic.",
//     ],
//   });

//   const [showPrescription, setShowPrescription] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const { auth } = useAuth();
//   const signOutHandler = useSignOut();

//   const handleViewPrescription = () => {
//     setShowPrescription((prevShow) => !prevShow);
//   };

//   const handleModalToggle = () => {
//     setShowModal((prevShow) => !prevShow);
//   };

//   return (
//     <div className="h-11/12 z-0 top-1/12 w-full bg-white text-black relative overflow-y-auto">
//       <div className="px-4 space-y-6 flex flex-col justify-around h-full">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full">
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
//               <Avatar rounded />
//             </div>
//             <h4 className="text-lg font-bold">{patientInfo.name}</h4>
//           </div>
//           <div className="mt-4 text-left">
//             <p>
//               <strong>Age:</strong> {patientInfo.age}
//             </p>
//             <p>
//               <strong>Estimated Date:</strong> {patientInfo.estimatedDate}
//             </p>
//             <p>
//               <strong>Corrected Date:</strong> {patientInfo.correctedDate}
//             </p>

//             <Button className="mx-auto p-3 mt-4 text-sm md:text-md text-white bg-purple-700 backdrop-blur-md hover:bg-purple-800">
//               <Link to="/profile" className="block w-full h-full text-white">
//                 View History
//               </Link>
//             </Button>

//             <div className="bg-white py-6 px-4 rounded-lg shadow-lg w-full text-white">
//               <div className="flex justify-between space-x-4 m-auto  text-sm md:text-md">
//                 <div className="bg-purple-700 flex-1 p-2 rounded text-center">
//                   <Link to="/appointments">Appointment History</Link>
//                 </div>
//                 <div className="bg-orange-700 flex-1 m-auto py-2 px-1 rounded text-center">
//                   <Link to="/files">Scans & Reports</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {auth.role === "doctor" && (
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full">
//             <div className="text-center mb-4">
//               <h3 className="text-xl font-bold">Risk Level</h3>
//             </div>
//             <div className="text-center">
//               <div className="bg-yellow-500 rounded p-2 mt-2 inline-block">
//                 <p className="font-bold">{patientInfo.riskLevel}</p>
//               </div>
//             </div>
//             <div className="text-left mt-4">
//               {patientInfo.riskDescription.map((desc, index) => (
//                 <p key={index}>{desc}</p>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// {
//   /* Modal for Magnified Image 
//         {showModal && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//             onClick={handleModalToggle}
//           >
//             <div className="relative">
//               <button
//                 onClick={handleModalToggle}
//                 className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full"
//               >
//                 X
//               </button>
//               <img
//                 src="src/assets/download.jpg"
//                 alt="Magnified Prescription"
//                 className="w-[80vw] h-auto max-w-4xl rounded"
//               />
//             </div>
//           </div>
//         )}
//           */
// }



import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [vitals, setVitals] = useState({});
  const [showPrescription, setShowPrescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const signOutHandler = useSignOut();

  useEffect(() => {
    if (!auth?.pregnancyid) return;
    axios
      .get(`/api/vitals?pregnancy_id=${auth.pregnancyid}`)
      .then((res) => {
        const fetched = res.data.vitals || {};
        setVitals(fetched);
      })
      .catch((err) => console.error("❌ Failed to fetch vitals:", err));
  }, [auth]);

  const handleViewPrescription = () => {
    setShowPrescription((prevShow) => !prevShow);
  };

  const handleModalToggle = () => {
    setShowModal((prevShow) => !prevShow);
  };

  return (
    <div className="h-11/12 z-0 top-1/12 w-full bg-white text-black relative overflow-y-auto">
      <div className="px-4 space-y-6 flex flex-col justify-around h-full">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
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

            {/* New Fetal Summary */}
            {vitals?.LMP && (
              <p>
                <strong>LMP:</strong> {vitals.LMP}
              </p>
            )}
            {vitals?.GA && (
              <p>
                <strong>Gestational Age:</strong> {vitals.GA}
              </p>
            )}
            {/* {vitals?.EFW && (
              <p>
                <strong>Estimated Fetal Weight:</strong> {vitals.EFW} g
              </p>
            )} */}
            {vitals?.EDD && (
            <p>
              <strong>EDD:</strong> {vitals.EDD}
            </p>
          )}

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
      </div>
    </div>
  );
};

export default Sidebar;