// import React, { useState } from 'react';
// import axios from "../api/axios";
// const UploadReport = () => {
//   const [fileType, setFileType] = useState('');
//   const [file, setFile] = useState(null);
//   const [parameters, setParameters] = useState({});

//   const handleFileTypeChange = (e) => {
//     setFileType(e.target.value);
//     setParameters({});
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setParameters(prevParams => ({
//       ...prevParams,
//       [name]: value
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log('File Type:', fileType);
//   //   console.log('Uploaded File:', file);
//   //   console.log('Entered Parameters:', parameters);
//   //   // Process the data here
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       console.error("❌ No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileType", fileType);

//     Object.entries(parameters).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     try {
//       const res = await axios.post("/api/upload", formData);
//       console.log("✅ Extracted vitals from backend:", res.data.vitals);

//       alert("Vitals extracted:\n" + JSON.stringify(res.data.vitals, null, 2));
//     } catch (err) {
//       console.error("❌ Upload or NER processing failed:", err);
//       alert("Failed to upload or extract vitals.");
//     }
//   };

//   const renderFormFields = () => {
//     switch (fileType) {
//       case 'Blood Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Hemoglobin:
//               <input type="text" name="hemoglobin" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               White Blood Cells:
//               <input type="text" name="wbc" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Platelets:
//               <input type="text" name="platelets" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Ultrasound':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Fetal Heart Rate:
//               <input type="text" name="fetalHeartRate" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Gestational Age:
//               <input type="text" name="gestationalAge" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Placenta Position:
//               <input type="text" name="placentaPosition" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Glucose Tolerance Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Fasting Blood Sugar:
//               <input type="text" name="fastingBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               1 Hour Blood Sugar:
//               <input type="text" name="oneHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               2 Hour Blood Sugar:
//               <input type="text" name="twoHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-gray-900 text-center">Upload Medical Report</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Choose Report Type:
//               <select value={fileType} onChange={handleFileTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 <option value="">Select a report type</option>
//                 <option value="Blood Test">Blood Test</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="Glucose Tolerance Test">Glucose Tolerance Test</option>
//               </select>
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Upload File:
//               <input type="file" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//           {renderFormFields()}
//           <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadReport;






// 📁 UploadPage.jsx (Fully Refactored)
// import React, { useState } from 'react';
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const UploadReport = () => {
//   const [fileType, setFileType] = useState('');
//   const [file, setFile] = useState(null);
//   const [parameters, setParameters] = useState({});
//   const navigate = useNavigate();

//   const handleFileTypeChange = (e) => {
//     setFileType(e.target.value);
//     setParameters({});
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setParameters(prevParams => ({
//       ...prevParams,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please upload a file.");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileType", fileType);
//     Object.entries(parameters).forEach(([k, v]) => formData.append(k, v));

//     try {
//       const res = await axios.post("/api/upload", formData);
//       navigate("/dashboard", { state: { vitals: res.data.vitals } });
//     } catch (err) {
//       console.error("❌ Upload failed:", err);
//       alert("Upload or extraction failed.");
//     }
//   };

//   const renderFormFields = () => {
//     switch (fileType) {
//       case 'Blood Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Hemoglobin:
//               <input type="text" name="hemoglobin" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               White Blood Cells:
//               <input type="text" name="wbc" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Platelets:
//               <input type="text" name="platelets" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Ultrasound':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Fetal Heart Rate:
//               <input type="text" name="fetalHeartRate" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Gestational Age:
//               <input type="text" name="gestationalAge" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Placenta Position:
//               <input type="text" name="placentaPosition" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Glucose Tolerance Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Fasting Blood Sugar:
//               <input type="text" name="fastingBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               1 Hour Blood Sugar:
//               <input type="text" name="oneHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               2 Hour Blood Sugar:
//               <input type="text" name="twoHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-gray-900 text-center">Upload Medical Report</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Choose Report Type:
//               <select value={fileType} onChange={handleFileTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 <option value="">Select a report type</option>
//                 <option value="Blood Test">Blood Test</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="Glucose Tolerance Test">Glucose Tolerance Test</option>
//               </select>
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Upload File:
//               <input type="file" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//           {renderFormFields()}
//           <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadReport;






// 📁 UploadPage.jsx (with pregnancy_id support)
// import React, { useState } from 'react';
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const UploadReport = () => {
//   const [fileType, setFileType] = useState('');
//   const [file, setFile] = useState(null);
//   const [parameters, setParameters] = useState({});
//   const navigate = useNavigate();

//   // TODO: Replace this with actual pregnancy ID from user/session
//   const pregnancyId = "581d4d07-4551-11f0-b7c1-c03532d2edfe";

//   const handleFileTypeChange = (e) => {
//     setFileType(e.target.value);
//     setParameters({});
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setParameters(prevParams => ({
//       ...prevParams,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !fileType) {
//       alert("Please select both report type and file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileType", fileType);
//     Object.entries(parameters).forEach(([k, v]) => formData.append(k, v));

//     try {
//       // Step 1: Upload and extract vitals
//       const res = await axios.post("/api/upload", formData);
//       const extractedVitals = res.data.vitals;

//       // Step 2: Save extracted vitals to backend with pregnancy_id
//       await axios.post("/api/vitals", {
//         vitals: extractedVitals,
//         pregnancy_id: pregnancyId,
//       });

//       // Step 3: Navigate with state
//       navigate("/dashboard", { state: { vitals: extractedVitals } });

//     } catch (err) {
//       console.error("❌ Upload failed:", err);
//       alert("Upload or extraction failed.");
//     }
//   };

//   const renderFormFields = () => {
//     switch (fileType) {
//       case 'Blood Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Hemoglobin:
//               <input type="text" name="hemoglobin" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               White Blood Cells:
//               <input type="text" name="wbc" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Platelets:
//               <input type="text" name="platelets" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Ultrasound':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Fetal Heart Rate:
//               <input type="text" name="fetalHeartRate" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Gestational Age:
//               <input type="text" name="gestationalAge" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               Placenta Position:
//               <input type="text" name="placentaPosition" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Glucose Tolerance Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               Fasting Blood Sugar:
//               <input type="text" name="fastingBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               1 Hour Blood Sugar:
//               <input type="text" name="oneHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">
//               2 Hour Blood Sugar:
//               <input type="text" name="twoHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-gray-900 text-center">Upload Medical Report</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Choose Report Type:
//               <select value={fileType} onChange={handleFileTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 <option value="">Select a report type</option>
//                 <option value="Blood Test">Blood Test</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="Glucose Tolerance Test">Glucose Tolerance Test</option>
//               </select>
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Upload File:
//               <input type="file" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//           {renderFormFields()}
//           <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadReport;






// import React, { useState } from 'react';
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const UploadReport = () => {
//   const [fileType, setFileType] = useState('');
//   const [file, setFile] = useState(null);
//   const [parameters, setParameters] = useState({});
//   const navigate = useNavigate();

//   // Replace with actual pregnancy ID or load dynamically
//   const pregnancyId = "581d4d07-4551-11f0-b7c1-c03532d2edfe";

//   const handleFileTypeChange = (e) => {
//     setFileType(e.target.value);
//     setParameters({});
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setParameters(prevParams => ({
//       ...prevParams,
//       [name]: value
//     }));
//   };

//   const normalizeVitalKeys = (raw) => {
//     const keyMap = {
//       BIPARIETAL_DIAMETER: 'biparietal diameter',
//       FEMUR_LENGTH: 'femur length',
//       ABDOMINAL_CIRCUMFERENCE: 'abdominal circumference',
//       HEAD_CIRCUMFERENCE: 'head circumference',
//     };

//     const result = {};
//     Object.entries(raw).forEach(([k, v]) => {
//       if (keyMap[k]) result[keyMap[k]] = v;
//     });
//     return result;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !fileType) {
//       alert("Please select both report type and file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileType", fileType);
//     Object.entries(parameters).forEach(([k, v]) => formData.append(k, v));

//     try {
//       const res = await axios.post("/api/upload", formData);
//       const extractedVitals = res.data.vitals;

//       // Send vitals to backend with pregnancy_id
//       await axios.post("/api/vitals", {
//         vitals: extractedVitals,
//         pregnancy_id: pregnancyId,
//       });

//       // Format for frontend graph compatibility
//       const formattedVitals = normalizeVitalKeys(extractedVitals);

//       navigate("/dashboard", { state: { vitals: formattedVitals } });
//     } catch (err) {
//       console.error("❌ Upload failed:", err);
//       alert("Upload or extraction failed.");
//     }
//   };

//   const renderFormFields = () => {
//     switch (fileType) {
//       case 'Blood Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">Hemoglobin:
//               <input type="text" name="hemoglobin" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">White Blood Cells:
//               <input type="text" name="wbc" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">Platelets:
//               <input type="text" name="platelets" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Ultrasound':
//         return (
//           <div className="space-y-4">
//             <label className="block">Fetal Heart Rate:
//               <input type="text" name="fetalHeartRate" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">Gestational Age:
//               <input type="text" name="gestationalAge" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">Placenta Position:
//               <input type="text" name="placentaPosition" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       case 'Glucose Tolerance Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">Fasting Blood Sugar:
//               <input type="text" name="fastingBloodSugar" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">1 Hour Blood Sugar:
//               <input type="text" name="oneHourBloodSugar" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//             <label className="block">2 Hour Blood Sugar:
//               <input type="text" name="twoHourBloodSugar" onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-gray-900 text-center">Upload Medical Report</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Choose Report Type:
//               <select value={fileType} onChange={handleFileTypeChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 <option value="">Select a report type</option>
//                 <option value="Blood Test">Blood Test</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="Glucose Tolerance Test">Glucose Tolerance Test</option>
//               </select>
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">
//               Upload File:
//               <input type="file" onChange={handleFileChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </label>
//           </div>
//           {renderFormFields()}
//           <button type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadReport;




// import React, { useState } from 'react';
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// const { auth } = useAuth();
// const pregnancyId = auth?.pregnancyId;
// if (!pregnancyId) {
//   alert("Pregnancy ID not found. Please log in again.");
//   return;
// }


// const UploadReport = () => {
//   const [fileType, setFileType] = useState('');
//   const [file, setFile] = useState(null);
//   const [parameters, setParameters] = useState({});
//   const navigate = useNavigate();

//   // const pregnancyId = "581d4d07-4551-11f0-b7c1-c03532d2edfe"; // Replace dynamically later

//   const handleFileTypeChange = (e) => {
//     setFileType(e.target.value);
//     setParameters({});
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setParameters(prev => ({ ...prev, [name]: value }));
//   };

//   const formatVitalsForFrontend = (raw) => {
//     return {
//       'biparietal diameter': raw.BIPARIETAL_DIAMETER,
//       'femur length': raw.FEMUR_LENGTH,
//       'abdominal circumference': raw.ABDOMINAL_CIRCUMFERENCE,
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !fileType) return alert("Please select both file type and file.");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileType", fileType);
//     Object.entries(parameters).forEach(([k, v]) => formData.append(k, v));

//     try {
//       const res = await axios.post("/api/upload", formData);
//       const extractedVitals = res.data.vitals;

//       // Save to backend with pregnancy_id
//       await axios.post("/api/vitals", {
//         vitals: extractedVitals,
//         pregnancy_id: pregnancyId,
//       });

//       const formattedVitals = formatVitalsForFrontend(extractedVitals);
//       console.log("✅ Navigating to dashboard with:", formattedVitals);

//       navigate("/dashboard", { state: { vitals: formattedVitals } });

//     } catch (err) {
//       console.error("❌ Upload failed:", err);
//       alert("Upload or extraction failed.");
//     }
//   };

//   const renderFormFields = () => {
//     switch (fileType) {
//       case 'Blood Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">Hemoglobin:
//               <input type="text" name="hemoglobin" onChange={handleInputChange} className="form-input" />
//             </label>
//             <label className="block">White Blood Cells:
//               <input type="text" name="wbc" onChange={handleInputChange} className="form-input" />
//             </label>
//             <label className="block">Platelets:
//               <input type="text" name="platelets" onChange={handleInputChange} className="form-input" />
//             </label>
//           </div>
//         );
//       case 'Ultrasound':
//         return (
//           <div className="space-y-4">
//             <label className="block">Fetal Heart Rate:
//               <input type="text" name="fetalHeartRate" onChange={handleInputChange} className="form-input" />
//             </label>
//             <label className="block">Gestational Age:
//               <input type="text" name="gestationalAge" onChange={handleInputChange} className="form-input" />
//             </label>
//             <label className="block">Placenta Position:
//               <input type="text" name="placentaPosition" onChange={handleInputChange} className="form-input" />
//             </label>
//           </div>
//         );
//       case 'Glucose Tolerance Test':
//         return (
//           <div className="space-y-4">
//             <label className="block">Fasting Blood Sugar:
//               <input type="text" name="fastingBloodSugar" onChange={handleInputChange} className="form-input" />
//             </label>
//             <label className="block">1 Hour Blood Sugar:
//               <input type="text" name="oneHourBloodSugar" onChange={handleInputChange} className="form-input" />
//             </label>
//             <label className="block">2 Hour Blood Sugar:
//               <input type="text" name="twoHourBloodSugar" onChange={handleInputChange} className="form-input" />
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-gray-900 text-center">Upload Medical Report</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">Choose Report Type:
//               <select value={fileType} onChange={handleFileTypeChange} className="form-select">
//                 <option value="">Select a report type</option>
//                 <option value="Blood Test">Blood Test</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="Glucose Tolerance Test">Glucose Tolerance Test</option>
//               </select>
//             </label>
//           </div>
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-medium">Upload File:
//               <input type="file" onChange={handleFileChange} className="form-input" />
//             </label>
//           </div>
//           {renderFormFields()}
//           <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadReport;





import React, { useState } from 'react';
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const UploadReport = () => {
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState(null);
  const [parameters, setParameters] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();
  const pregnancyId = auth?.pregnancyid; // Make sure this matches how it's stored in authProvider

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    setParameters({});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParameters(prev => ({ ...prev, [name]: value }));
  };

  const formatVitalsForFrontend = (raw) => ({
    'biparietal diameter': raw.BIPARIETAL_DIAMETER,
    'femur length': raw.FEMUR_LENGTH,
    'abdominal circumference': raw.ABDOMINAL_CIRCUMFERENCE,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!file || !fileType) {
      alert("Please select both file type and file.");
      return;
    }

    if (!pregnancyId) {
      alert("Pregnancy ID not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);
    Object.entries(parameters).forEach(([k, v]) => formData.append(k, v));
    console.log("📤 Submitting form data:", formData);
    try {
      const res = await axios.post("/api/upload", formData);
      const extractedVitals = res.data.vitals;

      await axios.post("/api/vitals", {
        vitals: extractedVitals,
        pregnancy_id: pregnancyId,
      });

      const formattedVitals = formatVitalsForFrontend(extractedVitals);
      console.log("✅ Navigating to dashboard with:", formattedVitals);

      navigate("/user", { state: { vitals: formattedVitals } });
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload or extraction failed.");
    }
  };

  const renderFormFields = () => {
    switch (fileType) {
      case 'Blood Test':
        return (
          <div className="space-y-4">
            <label className="block">Hemoglobin:
              <input type="text" name="hemoglobin" onChange={handleInputChange} className="form-input" />
            </label>
            <label className="block">White Blood Cells:
              <input type="text" name="wbc" onChange={handleInputChange} className="form-input" />
            </label>
            <label className="block">Platelets:
              <input type="text" name="platelets" onChange={handleInputChange} className="form-input" />
            </label>
          </div>
        );
      case 'Ultrasound':
        return (
          <div className="space-y-4">
            <label className="block">Fetal Heart Rate:
              <input type="text" name="fetalHeartRate" onChange={handleInputChange} className="form-input" />
            </label>
            <label className="block">Gestational Age:
              <input type="text" name="gestationalAge" onChange={handleInputChange} className="form-input" />
            </label>
            <label className="block">Placenta Position:
              <input type="text" name="placentaPosition" onChange={handleInputChange} className="form-input" />
            </label>
          </div>
        );
      case 'Glucose Tolerance Test':
        return (
          <div className="space-y-4">
            <label className="block">Fasting Blood Sugar:
              <input type="text" name="fastingBloodSugar" onChange={handleInputChange} className="form-input" />
            </label>
            <label className="block">1 Hour Blood Sugar:
              <input type="text" name="oneHourBloodSugar" onChange={handleInputChange} className="form-input" />
            </label>
            <label className="block">2 Hour Blood Sugar:
              <input type="text" name="twoHourBloodSugar" onChange={handleInputChange} className="form-input" />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Upload Medical Report</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Choose Report Type:
              <select value={fileType} onChange={handleFileTypeChange} className="form-select">
                <option value="">Select a report type</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Glucose Tolerance Test">Glucose Tolerance Test</option>
              </select>
            </label>
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Upload File:
              <input type="file" onChange={handleFileChange} className="form-input" />
            </label>
          </div>
          {renderFormFields()}
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadReport;
