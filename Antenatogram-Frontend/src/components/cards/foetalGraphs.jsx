// import { useState } from "react";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";

// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [headCircumference, setHeadCircumference] = useState({
//     id: 'head circumference',
//     data: [
//       { date: '2023-01-15', value: 5 },
//       { date: '2023-02-20', value: 10 },
//       { date: '2023-03-25', value: 17 },
//     ],
//     threshold: 30,
//   });

//   const [abdominalCircumference, setAbdominalCircumference] = useState({
//     id: 'abdominal circumference',
//     data: [
//       { date: '2023-01-15', value: 3 },
//       { date: '2023-03-25', value: 15 },
//       { date: '2023-06-05', value: 27 },
//       { date: '2023-08-15', value: 35 },
//     ],
//     threshold: 25,
//   });

//   const [femurLength, setFemurLength] = useState({
//     id: 'femur length',
//     data: [
//       { date: '2023-01-15', value: 2 },
//       { date: '2023-04-30', value: 18 },
//       { date: '2023-08-15', value: 34 },
//     ],
//     threshold: 20,
//   });

//   const [biparietalDiameter, setBiparietalDiameter] = useState({
//     id: 'biparietal diameter',
//     data: [
//       { date: '2023-01-15', value: 1 },
//       { date: '2023-03-25', value: 9 },
//       { date: '2023-06-05', value: 19 },
//       { date: '2023-08-15', value: 28 },
//     ],
//     threshold: 15,
//   });

//   const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];
//   const formatDate = useFormatDate;

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case 'head circumference':
//         setHeadCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'abdominal circumference':
//         setAbdominalCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'femur length':
//         setFemurLength(prev => ({ ...prev, data: newData }));
//         break;
//       case 'biparietal diameter':
//         setBiparietalDiameter(prev => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error('Unknown parameter:', selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>
//         <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />
        
//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={handleSaveChanges}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;


// 📁 FoetalMeasurementsGraph.jsx (Refactored)
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";

// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [headCircumference, setHeadCircumference] = useState({
//     id: 'head circumference',
//     data: [
//       { date: '2023-01-15', value: 5 },
//       { date: '2023-02-20', value: 10 },
//       { date: '2023-03-25', value: 17 },
//     ],
//     threshold: 30,
//   });

//   const [abdominalCircumference, setAbdominalCircumference] = useState({
//     id: 'abdominal circumference',
//     data: [
//       { date: '2023-01-15', value: 3 },
//       { date: '2023-03-25', value: 15 },
//       { date: '2023-06-05', value: 27 },
//       { date: '2023-08-15', value: 35 },
//     ],
//     threshold: 25,
//   });

//   const [femurLength, setFemurLength] = useState({
//     id: 'femur length',
//     data: [
//       { date: '2023-01-15', value: 2 },
//       { date: '2023-04-30', value: 18 },
//       { date: '2023-08-15', value: 34 },
//     ],
//     threshold: 20,
//   });

//   const [biparietalDiameter, setBiparietalDiameter] = useState({
//     id: 'biparietal diameter',
//     data: [
//       { date: '2023-01-15', value: 1 },
//       { date: '2023-03-25', value: 9 },
//       { date: '2023-06-05', value: 19 },
//       { date: '2023-08-15', value: 28 },
//     ],
//     threshold: 15,
//   });

//   const location = useLocation();
//   const extractedVitals = location.state?.vitals;

//   useEffect(() => {
//     if (!extractedVitals) return;
//     const today = new Date().toISOString().split("T")[0];

//     const addData = (setter, value) => {
//       setter(prev => ({
//         ...prev,
//         data: [...prev.data, { date: today, value: parseFloat(value) }]
//       }));
//     };

//     if (extractedVitals.FEMUR_LENGTH) addData(setFemurLength, extractedVitals.FEMUR_LENGTH);
//     if (extractedVitals.BIPARIETAL_DIAMETER) addData(setBiparietalDiameter, extractedVitals.BIPARIETAL_DIAMETER);
//     if (extractedVitals.ABDOMINAL_CIRCUMFERENCE) addData(setAbdominalCircumference, extractedVitals.ABDOMINAL_CIRCUMFERENCE);
//     if (extractedVitals.HEAD_CIRCUMFERENCE) addData(setHeadCircumference, extractedVitals.HEAD_CIRCUMFERENCE);
//   }, [extractedVitals]);

//   const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];
//   const formatDate = useFormatDate;

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case 'head circumference':
//         setHeadCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'abdominal circumference':
//         setAbdominalCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'femur length':
//         setFemurLength(prev => ({ ...prev, data: newData }));
//         break;
//       case 'biparietal diameter':
//         setBiparietalDiameter(prev => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error('Unknown parameter:', selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>
//         <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />

//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={handleSaveChanges}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;


// 📁 FoetalMeasurementsGraph.jsx (Refactored with Real-Time Polling & MySQL-compatible format)
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../../api/axios";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";

// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [headCircumference, setHeadCircumference] = useState({ id: 'head circumference', data: [], threshold: 30 });
//   const [abdominalCircumference, setAbdominalCircumference] = useState({ id: 'abdominal circumference', data: [], threshold: 25 });
//   const [femurLength, setFemurLength] = useState({ id: 'femur length', data: [], threshold: 20 });
//   const [biparietalDiameter, setBiparietalDiameter] = useState({ id: 'biparietal diameter', data: [], threshold: 15 });

//   const location = useLocation();
//   const extractedVitals = location.state?.vitals;
//   const formatDate = useFormatDate;

//   const addData = (setter, value) => {
//     const today = new Date().toISOString().split("T")[0];
//     setter(prev => ({
//       ...prev,
//       data: [...prev.data, { date: today, value: parseFloat(value) }]
//     }));
//   };

//   // 🧠 Add new vitals (from UploadPage navigation)
//   useEffect(() => {
//     if (!extractedVitals) return;
//     if (extractedVitals.FEMUR_LENGTH) addData(setFemurLength, extractedVitals.FEMUR_LENGTH);
//     if (extractedVitals.BIPARIETAL_DIAMETER) addData(setBiparietalDiameter, extractedVitals.BIPARIETAL_DIAMETER);
//     if (extractedVitals.ABDOMINAL_CIRCUMFERENCE) addData(setAbdominalCircumference, extractedVitals.ABDOMINAL_CIRCUMFERENCE);
//     if (extractedVitals.HEAD_CIRCUMFERENCE) addData(setHeadCircumference, extractedVitals.HEAD_CIRCUMFERENCE);

//     // Send to backend (MySQL)
//     axios.post("/api/vitals", { vitals: extractedVitals }).catch(console.error);
//   }, [extractedVitals]);

//   // 🔁 Optional: Real-time polling from backend every 15s
//   // useEffect(() => {
//   //   const interval = setInterval(async () => {
//   //     try {
//   //       const res = await axios.get("/api/vitals/latest");
//   //       const vitals = res.data;
//   //       if (vitals.FEMUR_LENGTH) addData(setFemurLength, vitals.FEMUR_LENGTH);
//   //       if (vitals.BIPARIETAL_DIAMETER) addData(setBiparietalDiameter, vitals.BIPARIETAL_DIAMETER);
//   //       if (vitals.ABDOMINAL_CIRCUMFERENCE) addData(setAbdominalCircumference, vitals.ABDOMINAL_CIRCUMFERENCE);
//   //       if (vitals.HEAD_CIRCUMFERENCE) addData(setHeadCircumference, vitals.HEAD_CIRCUMFERENCE);
//   //     } catch (err) {
//   //       console.error("Polling failed:", err);
//   //     }
//   //   }, 15000);

//   //   return () => clearInterval(interval);
//   // }, []);

//   const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case 'head circumference':
//         setHeadCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'abdominal circumference':
//         setAbdominalCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'femur length':
//         setFemurLength(prev => ({ ...prev, data: newData }));
//         break;
//       case 'biparietal diameter':
//         setBiparietalDiameter(prev => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error('Unknown parameter:', selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>
//         <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />

//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={handleSaveChanges}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;






//Working code with white screen crash there



// import { useState, useEffect } from "react"; 
// import { useLocation } from "react-router-dom";
// import axios from "../../api/axios";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";


// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [headCircumference, setHeadCircumference] = useState({ id: 'head circumference', data: [], threshold: 30 });
//   const [abdominalCircumference, setAbdominalCircumference] = useState({ id: 'abdominal circumference', data: [], threshold: 25 });
//   const [femurLength, setFemurLength] = useState({ id: 'femur length', data: [], threshold: 20 });
//   const [biparietalDiameter, setBiparietalDiameter] = useState({ id: 'biparietal diameter', data: [], threshold: 15 });

//   const location = useLocation();
//   const extractedVitals = location.state?.vitals;
//   const formatDate = useFormatDate;

//   const addData = (setter, value) => {
//     const today = new Date().toISOString().split("T")[0];
//     const parsed = parseFloat(value);
//     if (!isNaN(parsed)) {
//       setter(prev => ({
//         ...prev,
//         data: [...prev.data, { date: today, value: parsed }]
//       }));
//     }
//   };

//   useEffect(() => {
//     if (!extractedVitals) return;
//     console.log("🧪 Extracted vitals received in FoetalGraphs:", extractedVitals);

//     if (extractedVitals["femur length"]) addData(setFemurLength, extractedVitals["femur length"]);
//     if (extractedVitals["biparietal diameter"]) addData(setBiparietalDiameter, extractedVitals["biparietal diameter"]);
//     if (extractedVitals["abdominal circumference"]) addData(setAbdominalCircumference, extractedVitals["abdominal circumference"]);
//     if (extractedVitals["head circumference"]) addData(setHeadCircumference, extractedVitals["head circumference"]);

//     // Optionally send to backend
//     axios.post("/api/vitals", { vitals: extractedVitals }).catch(console.error);
//   }, [extractedVitals]);

//   const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case 'head circumference':
//         setHeadCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'abdominal circumference':
//         setAbdominalCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case 'femur length':
//         setFemurLength(prev => ({ ...prev, data: newData }));
//         break;
//       case 'biparietal diameter':
//         setBiparietalDiameter(prev => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error('Unknown parameter:', selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>
//         <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />

//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={handleSaveChanges}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;




//Perfectly working code

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../../api/axios";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";
// import useAuth from "../../hooks/useAuth";

// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [headCircumference, setHeadCircumference] = useState({ id: "head circumference", data: [], threshold: 30 });
//   const [abdominalCircumference, setAbdominalCircumference] = useState({ id: "abdominal circumference", data: [], threshold: 25 });
//   const [femurLength, setFemurLength] = useState({ id: "femur length", data: [], threshold: 20 });
//   const [biparietalDiameter, setBiparietalDiameter] = useState({ id: "biparietal diameter", data: [], threshold: 15 });

//   const location = useLocation();
//   const extractedVitals = location.state?.vitals;
//   const { auth } = useAuth();
//   const formatDate = useFormatDate;

//   const addData = (setter, value) => {
//     const today = new Date().toISOString().split("T")[0];
//     const parsed = parseFloat(value);
//     if (!isNaN(parsed)) {
//       setter(prev => ({
//         ...prev,
//         data: [...prev.data, { date: today, value: parsed }]
//       }));
//     }
//   };

//   useEffect(() => {
//     if (!extractedVitals) return;

//     console.log("✅ Navigating to dashboard with:", extractedVitals);

//     // Normalize vitals keys: make lowercase, replace underscores with spaces
//     const normalizedVitals = {};
//     for (const [key, value] of Object.entries(extractedVitals)) {
//       const normalizedKey = key.toLowerCase().replace(/_/g, " ");
//       normalizedVitals[normalizedKey] = value;
//     }

//     if (normalizedVitals["femur length"]) addData(setFemurLength, normalizedVitals["femur length"]);
//     if (normalizedVitals["biparietal diameter"]) addData(setBiparietalDiameter, normalizedVitals["biparietal diameter"]);
//     if (normalizedVitals["abdominal circumference"]) addData(setAbdominalCircumference, normalizedVitals["abdominal circumference"]);
//     if (normalizedVitals["head circumference"]) addData(setHeadCircumference, normalizedVitals["head circumference"]);

//     // Send to backend only if pregnancyid is available
//     if (auth?.pregnancyid) {
//       axios
//         .post("/api/vitals", { vitals: normalizedVitals, pregnancy_id: auth.pregnancyid })
//         .then(() => console.log("✅ Sent vitals to backend"))
//         .catch((err) => console.error("❌ Failed to send vitals:", err));
//     } else {
//       console.warn("⚠️ pregnancy_id is missing. Not sending vitals.");
//     }
//   }, [extractedVitals, auth]);

//   const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case "head circumference":
//         setHeadCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case "abdominal circumference":
//         setAbdominalCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case "femur length":
//         setFemurLength(prev => ({ ...prev, data: newData }));
//         break;
//       case "biparietal diameter":
//         setBiparietalDiameter(prev => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error("Unknown parameter:", selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   if (!auth || !auth.pregnancyid) return <div className="text-center mt-10 text-gray-500">Loading graphs...</div>;

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>
//         <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />

//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={handleSaveChanges}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;



//perfect working code with duplicate values entered in the graph

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../../api/axios";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";
// import useAuth from "../../hooks/useAuth";

// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [headCircumference, setHeadCircumference] = useState({ id: "head circumference", data: [], threshold: 30 });
//   const [abdominalCircumference, setAbdominalCircumference] = useState({ id: "abdominal circumference", data: [], threshold: 25 });
//   const [femurLength, setFemurLength] = useState({ id: "femur length", data: [], threshold: 20 });
//   const [biparietalDiameter, setBiparietalDiameter] = useState({ id: "biparietal diameter", data: [], threshold: 15 });

//   const [additionalData, setAdditionalData] = useState({});
//   const location = useLocation();
//   const extractedVitals = location.state?.vitals;
//   const { auth } = useAuth();
//   const formatDate = useFormatDate;

//   const addData = (setter, value) => {
//     const today = new Date().toISOString().split("T")[0];
//     const parsed = parseFloat(value);
//     if (!isNaN(parsed)) {
//       setter(prev => ({
//         ...prev,
//         data: [...prev.data, { date: today, value: parsed }]
//       }));
//     }
//   };

//   useEffect(() => {
//     const normalizedVitals = {};

//     if (extractedVitals) {
//       console.log("✅ Navigating to dashboard with:", extractedVitals);

//       for (const [key, value] of Object.entries(extractedVitals)) {
//         const normalizedKey = key.toLowerCase().replace(/_/g, " ");
//         normalizedVitals[normalizedKey] = value;
//       }

//       if (normalizedVitals["femur length"]) addData(setFemurLength, normalizedVitals["femur length"]);
//       if (normalizedVitals["biparietal diameter"]) addData(setBiparietalDiameter, normalizedVitals["biparietal diameter"]);
//       if (normalizedVitals["abdominal circumference"]) addData(setAbdominalCircumference, normalizedVitals["abdominal circumference"]);
//       if (normalizedVitals["head circumference"]) addData(setHeadCircumference, normalizedVitals["head circumference"]);

//       setAdditionalData({
//         efw: normalizedVitals["efw"],
//         ga: normalizedVitals["ga"],
//         lmp: normalizedVitals["lmp"],
//         edd: normalizedVitals["edd"],
//       });

//       if (auth?.pregnancyid) {
//         axios
//           .post("/api/vitals", { vitals: normalizedVitals, pregnancy_id: auth.pregnancyid })
//           .then(() => console.log("✅ Sent vitals to backend"))
//           .catch((err) => console.error("❌ Failed to send vitals:", err));
//       }
//     } else if (auth?.pregnancyid) {
//       axios.get(`/api/vitals?pregnancy_id=${auth.pregnancyid}`)
//         .then((res) => {
//           const fetched = res.data.vitals || {};
//           setAdditionalData({
//             lmp: fetched.LMP,
//             edd: fetched.EDD,
//             ga: fetched.GA
//           });
//         })
//         .catch((err) => console.error("❌ Failed to fetch vitals:", err));
//     }
//   }, [extractedVitals, auth]);

//   const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case "head circumference":
//         setHeadCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case "abdominal circumference":
//         setAbdominalCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case "femur length":
//         setFemurLength(prev => ({ ...prev, data: newData }));
//         break;
//       case "biparietal diameter":
//         setBiparietalDiameter(prev => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error("Unknown parameter:", selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   if (!auth || !auth.pregnancyid) {
//     return <div className="text-center mt-10 text-gray-500">Loading graphs...</div>;
//   }

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>

//         {/* Top summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 mb-4">
//           {additionalData.lmp && (
//             <p><span className="font-semibold">LMP:</span> {additionalData.lmp}</p>
//           )}
//           {additionalData.edd && (
//             <p><span className="font-semibold">EDD:</span> {additionalData.edd}</p>
//           )}
//           {additionalData.ga && (
//             <p><span className="font-semibold">Gestational Age:</span> {additionalData.ga.replace("w", " weeks ").replace("d", " days")}</p>
//           )}
//           {additionalData.efw && (
//             <p><span className="font-semibold">Estimated Fetal Weight:</span> {additionalData.efw}g</p>
//           )}
//         </div>

//         {/* Graphs */}
//         <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />

//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={handleSaveChanges}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;



// perfect working code (showed to doctor)


// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../../api/axios";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";
// import useAuth from "../../hooks/useAuth";

// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [headCircumference, setHeadCircumference] = useState({ id: "head circumference", data: [], threshold: 30 });
//   const [abdominalCircumference, setAbdominalCircumference] = useState({ id: "abdominal circumference", data: [], threshold: 25 });
//   const [femurLength, setFemurLength] = useState({ id: "femur length", data: [], threshold: 20 });
//   const [biparietalDiameter, setBiparietalDiameter] = useState({ id: "biparietal diameter", data: [], threshold: 15 });

//   const [additionalData, setAdditionalData] = useState({});
//   const location = useLocation();
//   const extractedVitals = location.state?.vitals;
//   const { auth } = useAuth();
//   const formatDate = useFormatDate;

//   // const addData = (setter, value) => {
//   //   const today = new Date().toISOString().split("T")[0];
//   //   const parsed = parseFloat(value);
//   //   if (!isNaN(parsed)) {
//   //     setter(prev => ({
//   //       ...prev,
//   //       data: [...prev.data, { date: today, value: parsed }]
//   //     }));
//   //   }
//   // };
//   const addData = (setter, value) => {
//     const today = new Date().toISOString().split("T")[0];
//     const parsed = parseFloat(value);
//     if (!isNaN(parsed)) {
//       setter(prev => {
//         // avoid duplication if same date+value exists
//         const exists = prev.data.some(entry => entry.date === today && entry.value === parsed);
//         if (exists) return prev;
//         return {
//           ...prev,
//           data: [...prev.data, { date: today, value: parsed }],
//         };
//       });
//     }
//   };


//   // useEffect(() => {
//   //   const normalizedVitals = {};
//   //   let vitalsAlreadySent = false;

//   //   if (extractedVitals) {
//   //     console.log("✅ Navigating to dashboard with:", extractedVitals);

//   //     for (const [key, value] of Object.entries(extractedVitals)) {
//   //       const normalizedKey = key.toLowerCase().replace(/_/g, " ");
//   //       normalizedVitals[normalizedKey] = value;
//   //     }

//   //     if (normalizedVitals["femur length"]) addData(setFemurLength, normalizedVitals["femur length"]);
//   //     if (normalizedVitals["biparietal diameter"]) addData(setBiparietalDiameter, normalizedVitals["biparietal diameter"]);
//   //     if (normalizedVitals["abdominal circumference"]) addData(setAbdominalCircumference, normalizedVitals["abdominal circumference"]);
//   //     if (normalizedVitals["head circumference"]) addData(setHeadCircumference, normalizedVitals["head circumference"]);

//   //     setAdditionalData({
//   //       ga: normalizedVitals["ga"],
//   //       lmp: normalizedVitals["lmp"],
//   //       edd: normalizedVitals["edd"],
//   //     });

//   //     if (auth?.pregnancyid && !vitalsAlreadySent) {
//   //       axios
//   //         .post("/api/vitals", { vitals: normalizedVitals, pregnancy_id: auth.pregnancyid })
//   //         .then(() => {
//   //           console.log("✅ Sent vitals to backend");
//   //           vitalsAlreadySent = true;
//   //         })
//   //         .catch((err) => console.error("❌ Failed to send vitals:", err));
//   //     }
//   //   } else if (auth?.pregnancyid) {
//   //     axios
//   //       .get(`/api/vitals?pregnancy_id=${auth.pregnancyid}`)
//   //       .then((res) => {
//   //         const fetched = res.data.vitals || {};
//   //         setAdditionalData({
//   //           lmp: fetched.LMP,
//   //           edd: fetched.EDD,
//   //           ga: fetched.GA,

//   //         });
//   //       })
//   //       .catch((err) => console.error("❌ Failed to fetch vitals:", err));
//   //   }
//   // }, [extractedVitals, auth]);

//   useEffect(() => {
//     const normalizedVitals = {};

//     const processVitals = (incoming) => {
//       for (const [key, value] of Object.entries(incoming)) {
//         const normalizedKey = key.toLowerCase().replace(/_/g, " ");
//         normalizedVitals[normalizedKey] = value;
//       }

//       if (normalizedVitals["femur length"]) addData(setFemurLength, normalizedVitals["femur length"]);
//       if (normalizedVitals["biparietal diameter"]) addData(setBiparietalDiameter, normalizedVitals["biparietal diameter"]);
//       if (normalizedVitals["abdominal circumference"]) addData(setAbdominalCircumference, normalizedVitals["abdominal circumference"]);
//       if (normalizedVitals["head circumference"]) addData(setHeadCircumference, normalizedVitals["head circumference"]);

//       setAdditionalData({
//         // efw: normalizedVitals["efw"],
//         ga: normalizedVitals["ga"],
//         lmp: normalizedVitals["lmp"],
//         edd: normalizedVitals["edd"],
//       });
//     };

//     // Only send vitals when navigated from OCR flow (once)
//     if (extractedVitals && auth?.pregnancyid) {
//       processVitals(extractedVitals);

//       // Post once
//       axios
//         .post("/api/vitals", { vitals: extractedVitals, pregnancy_id: auth.pregnancyid })
//         .then(() => console.log("✅ Sent vitals to backend"))
//         .catch((err) => console.error("❌ Failed to send vitals:", err));
//     }

//     // Always fetch stored vitals from DB for summary display
//     if (auth?.pregnancyid) {
//       axios
//         .get(`/api/vitals?pregnancy_id=${auth.pregnancyid}`)
//         .then((res) => {
//           const fetched = res.data.vitals || {};
//           setAdditionalData({
//             lmp: fetched.LMP,
//             edd: fetched.EDD,
//             ga: fetched.GA,
//             // efw: fetched.EFW,
//           });
//         })
//         .catch((err) => console.error("❌ Failed to fetch vitals:", err));
//     }
//   }, [extractedVitals, auth]);

//   const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case "head circumference":
//         setHeadCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case "abdominal circumference":
//         setAbdominalCircumference(prev => ({ ...prev, data: newData }));
//         break;
//       case "femur length":
//         setFemurLength(prev => ({ ...prev, data: newData }));
//         break;
//       case "biparietal diameter":
//         setBiparietalDiameter(prev => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error("Unknown parameter:", selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   if (!auth || !auth.pregnancyid) {
//     return <div className="text-center mt-10 text-gray-500">Loading graphs...</div>;
//   }

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>

//         {/* Top summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 mb-4">
//           {additionalData.lmp && (
//             <p><span className="font-semibold">LMP:</span> {additionalData.lmp}</p>
//           )}
//           {additionalData.edd && (
//             <p><span className="font-semibold">EDD:</span> {additionalData.edd}</p>
//           )}
//           {additionalData.ga && (
//             <p><span className="font-semibold">Gestational Age:</span> {additionalData.ga}</p>
//           )}
//           {/* {additionalData.efw && (
//             <p><span className="font-semibold">Estimated Fetal Weight:</span> {additionalData.efw}g</p>
//           )} */}
//         </div>

//         {/* Graphs */}
//         <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />

//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={handleSaveChanges}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;











// Perfect working code with adding new graph feature


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useFormatDate from "../../hooks/useFormatDate.jsx";
import GraphModal from "../modals/graphModal.jsx";
import GraphsCard from "./graphsCard.jsx";
import useAuth from "../../hooks/useAuth";

const FoetalMeasurementsGraph = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  // Single array like Vitals
  const [parameters, setParameters] = useState([
    { id: "head circumference", data: [], threshold: 30, unit: "mm" },
    { id: "abdominal circumference", data: [], threshold: 25, unit: "mm" },
    { id: "femur length", data: [], threshold: 20, unit: "mm" },
    { id: "biparietal diameter", data: [], threshold: 15, unit: "mm" },
  ]);

  const [additionalData, setAdditionalData] = useState({});
  const [showNewGraphModal, setShowNewGraphModal] = useState(false);
  const [newGraphName, setNewGraphName] = useState("");
  const [newGraphUnit, setNewGraphUnit] = useState("");

  const location = useLocation();
  const extractedVitals = location.state?.vitals;
  const { auth } = useAuth();
  const formatDate = useFormatDate;

  // Helper: add value to a parameter by id, de-dup same date+value
  const addDataToParameter = (id, value) => {
    const today = new Date().toISOString().split("T")[0];
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return;

    setParameters((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const exists = p.data.some((d) => d.date === today && d.value === parsed);
        if (exists) return p;
        return { ...p, data: [...p.data, { date: today, value: parsed }] };
        }
      )
    );
  };

  useEffect(() => {
    const normalized = {};

    const processVitals = (incoming) => {
      for (const [key, value] of Object.entries(incoming)) {
        const k = key.toLowerCase().replace(/_/g, " ");
        normalized[k] = value;
      }

      if (normalized["femur length"]) addDataToParameter("femur length", normalized["femur length"]);
      if (normalized["biparietal diameter"]) addDataToParameter("biparietal diameter", normalized["biparietal diameter"]);
      if (normalized["abdominal circumference"]) addDataToParameter("abdominal circumference", normalized["abdominal circumference"]);
      if (normalized["head circumference"]) addDataToParameter("head circumference", normalized["head circumference"]);

      setAdditionalData({
        ga: normalized["ga"],
        lmp: normalized["lmp"],
        edd: normalized["edd"],
      });
    };

    // Post to backend only when coming from upload/OCR flow
    if (extractedVitals && auth?.pregnancyid) {
      processVitals(extractedVitals);
      axios
        .post("/api/vitals", { vitals: extractedVitals, pregnancy_id: auth.pregnancyid })
        .then(() => console.log("✅ Sent vitals to backend"))
        .catch((err) => console.error("❌ Failed to send vitals:", err));
    }

    // Always fetch stored vitals for summary header
    if (auth?.pregnancyid) {
      axios
        .get(`/api/vitals?pregnancy_id=${auth.pregnancyid}`)
        .then((res) => {
          const fetched = res.data.vitals || {};
          setAdditionalData({
            lmp: fetched.LMP,
            edd: fetched.EDD,
            ga: fetched.GA,
          });
        })
        .catch((err) => console.error("❌ Failed to fetch vitals:", err));
    }
  }, [extractedVitals, auth]);

  const handleCardClick = (parameter) => {
    setSelectedParameter(parameter);
    setOpenModal(true);
  };

  const handleSaveChanges = (newData) => {
    setParameters((prev) =>
      prev.map((p) => (p.id === selectedParameter.id ? { ...p, data: newData } : p))
    );
    setOpenModal(false);
  };

  const handleAddNewGraph = () => {
    if (!newGraphName.trim()) return;
    const id = newGraphName.trim().toLowerCase();
    const newGraph = {
      id,
      data: [],
      threshold: null,
      unit: newGraphUnit || "",
    };
    setParameters((prev) => [...prev, newGraph]);
    setNewGraphName("");
    setNewGraphUnit("");
    setShowNewGraphModal(false);
  };

  if (!auth || !auth.pregnancyid) {
    return <div className="text-center mt-10 text-gray-500">Loading graphs...</div>;
  }

  return (
    <div>
      <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Foetal Measurements</h2>
          <button
            onClick={() => setShowNewGraphModal(true)}
            className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-700"
          >
            +
          </button>
        </div>

        {/* Top summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 mb-4">
          {additionalData.lmp && (
            <p>
              <span className="font-semibold">LMP:</span> {additionalData.lmp}
            </p>
          )}
          {additionalData.edd && (
            <p>
              <span className="font-semibold">EDD:</span> {additionalData.edd}
            </p>
          )}
          {additionalData.ga && (
            <p>
              <span className="font-semibold">Gestational Age:</span> {additionalData.ga}
            </p>
          )}
        </div>

        {/* Graphs */}
        <GraphsCard
          parameters={parameters}
          handleCardClick={handleCardClick}
          formatDate={formatDate}
        />

        {selectedParameter && (
          <GraphModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedParameter={selectedParameter}
            onSave={handleSaveChanges}
          />
        )}

        {/* Add New Graph Modal (same as Vitals) */}
        {showNewGraphModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Add New Graph</h3>
              <input
                type="text"
                placeholder="Graph Name"
                className="border w-full p-2 mb-2 rounded"
                value={newGraphName}
                onChange={(e) => setNewGraphName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Unit (optional)"
                className="border w-full p-2 mb-4 rounded"
                value={newGraphUnit}
                onChange={(e) => setNewGraphUnit(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNewGraphModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewGraph}
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoetalMeasurementsGraph;


// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "../../api/axios";
// import useFormatDate from "../../hooks/useFormatDate.jsx";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";
// import useAuth from "../../hooks/useAuth";

// const FoetalMeasurementsGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   // Pregnancy type
//   const [pregnancyType, setPregnancyType] = useState("single"); // single | twin

//   // Parameters (support Baby A & Baby B in the same graph)
//   const [parameters, setParameters] = useState([
//     { id: "head circumference", data: { babyA: [], babyB: [] }, threshold: 30, unit: "mm" },
//     { id: "abdominal circumference", data: { babyA: [], babyB: [] }, threshold: 25, unit: "mm" },
//     { id: "femur length", data: { babyA: [], babyB: [] }, threshold: 20, unit: "mm" },
//     { id: "biparietal diameter", data: { babyA: [], babyB: [] }, threshold: 15, unit: "mm" },
//   ]);

//   const [additionalData, setAdditionalData] = useState({});
//   const [showNewGraphModal, setShowNewGraphModal] = useState(false);
//   const [newGraphName, setNewGraphName] = useState("");
//   const [newGraphUnit, setNewGraphUnit] = useState("");

//   const location = useLocation();
//   const extractedVitals = location.state?.vitals;
//   const { auth } = useAuth();
//   const formatDate = useFormatDate;

//   // Helper: add data for Baby A or B
//   const addDataToParameter = (id, value, baby = "babyA") => {
//     const today = new Date().toISOString().split("T")[0];
//     const parsed = parseFloat(value);
//     if (isNaN(parsed)) return;

//     setParameters((prev) =>
//       prev.map((p) => {
//         if (p.id !== id) return p;
//         const exists = p.data[baby].some((d) => d.date === today && d.value === parsed);
//         if (exists) return p;
//         return {
//           ...p,
//           data: {
//             ...p.data,
//             [baby]: [...p.data[baby], { date: today, value: parsed }],
//           },
//         };
//       })
//     );
//   };

//   useEffect(() => {
//     if (!extractedVitals && !auth?.pregnancyid) return;

//     const normalized = {};
//     if (extractedVitals) {
//       for (const [key, value] of Object.entries(extractedVitals)) {
//         const k = key.toLowerCase().replace(/_/g, " ");
//         normalized[k] = value;
//       }

//       // For now assume incoming data belongs to Baby A
//       addDataToParameter("femur length", normalized["femur length"], "babyA");
//       addDataToParameter("biparietal diameter", normalized["biparietal diameter"], "babyA");
//       addDataToParameter("abdominal circumference", normalized["abdominal circumference"], "babyA");
//       addDataToParameter("head circumference", normalized["head circumference"], "babyA");

//       setAdditionalData({
//         ga: normalized["ga"],
//         lmp: normalized["lmp"],
//         edd: normalized["edd"],
//       });

//       if (auth?.pregnancyid) {
//         axios
//           .post("/api/vitals", { vitals: extractedVitals, pregnancy_id: auth.pregnancyid })
//           .then(() => console.log("✅ Sent vitals to backend"))
//           .catch((err) => console.error("❌ Failed to send vitals:", err));
//       }
//     }

//     if (auth?.pregnancyid) {
//       axios
//         .get(`/api/vitals?pregnancy_id=${auth.pregnancyid}`)
//         .then((res) => {
//           const fetched = res.data.vitals || {};
//           setAdditionalData({
//             lmp: fetched.LMP,
//             edd: fetched.EDD,
//             ga: fetched.GA,
//           });
//         })
//         .catch((err) => console.error("❌ Failed to fetch vitals:", err));
//     }
//   }, [extractedVitals, auth]);

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData, baby = "babyA") => {
//     setParameters((prev) =>
//       prev.map((p) =>
//         p.id === selectedParameter.id
//           ? { ...p, data: { ...p.data, [baby]: newData } }
//           : p
//       )
//     );
//     setOpenModal(false);
//   };

//   const handleAddNewGraph = () => {
//     if (!newGraphName.trim()) return;
//     const id = newGraphName.trim().toLowerCase();
//     const newGraph = { id, data: { babyA: [], babyB: [] }, threshold: null, unit: newGraphUnit || "" };
//     setParameters((prev) => [...prev, newGraph]);
//     setNewGraphName("");
//     setNewGraphUnit("");
//     setShowNewGraphModal(false);
//   };

//   if (!auth || !auth.pregnancyid) {
//     return <div className="text-center mt-10 text-gray-500">Loading graphs...</div>;
//   }

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Foetal Measurements</h2>

//           {/* Dropdown for Single/Twin */}
//           <select
//             value={pregnancyType}
//             onChange={(e) => setPregnancyType(e.target.value)}
//             className="border p-1 rounded text-sm mr-3"
//           >
//             <option value="single">Single</option>
//             <option value="twin">Twin</option>
//           </select>

//           <button
//             onClick={() => setShowNewGraphModal(true)}
//             className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-700"
//           >
//             +
//           </button>
//         </div>

//         {/* Top summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 mb-4">
//           {additionalData.lmp && <p><span className="font-semibold">LMP:</span> {additionalData.lmp}</p>}
//           {additionalData.edd && <p><span className="font-semibold">EDD:</span> {additionalData.edd}</p>}
//           {additionalData.ga && <p><span className="font-semibold">Gestational Age:</span> {additionalData.ga}</p>}
//         </div>

//         {/* Graphs */}
//         <GraphsCard
//           parameters={parameters}
//           handleCardClick={handleCardClick}
//           formatDate={formatDate}
//         />

//         {selectedParameter && (
//           <GraphModal
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//             selectedParameter={selectedParameter}
//             onSave={(newData) => handleSaveChanges(newData)}
//           />
//         )}

//         {/* Add New Graph Modal */}
//         {showNewGraphModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//               <h3 className="text-lg font-bold mb-4">Add New Graph</h3>
//               <input
//                 type="text"
//                 placeholder="Graph Name"
//                 className="border w-full p-2 mb-2 rounded"
//                 value={newGraphName}
//                 onChange={(e) => setNewGraphName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Unit (optional)"
//                 className="border w-full p-2 mb-4 rounded"
//                 value={newGraphUnit}
//                 onChange={(e) => setNewGraphUnit(e.target.value)}
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   onClick={() => setShowNewGraphModal(false)}
//                   className="px-4 py-2 bg-gray-300 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddNewGraph}
//                   className="px-4 py-2 bg-purple-600 text-white rounded"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoetalMeasurementsGraph;
