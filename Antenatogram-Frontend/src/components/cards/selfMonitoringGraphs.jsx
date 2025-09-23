// perfect code ( showed to doctor) 

// import { useState } from "react";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";
// import { format } from "date-fns";

// const SelfMonitoringParametersGraph = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [weight, setWeight] = useState({
//     id: "weight",
//     data: [
//       { date: "2023-08-27", value: 81 },
//       { date: "2023-09-03", value: 81.5 },
//       { date: "2023-09-10", value: 82 },
//       { date: "2023-09-17", value: 82.5 },
//       { date: "2023-09-24", value: 83 },
//       { date: "2023-10-01", value: 83.5 },
//       { date: "2023-10-08", value: 84 },
//       { date: "2023-10-15", value: 84.5 },
//       { date: "2023-10-22", value: 85 },
//       { date: "2024-03-10", value: 95 },
//       { date: "2024-04-28", value: 98.5 },
//       { date: "2024-05-05", value: 99 },
//       { date: "2024-05-12", value: 99.5 },
//       { date: "2024-05-19", value: 100 },
//       { date: "2024-05-26", value: 100.5 },
//       { date: "2024-06-02", value: 101 },
//       { date: "2024-06-09", value: 101.5 },
//       { date: "2024-06-16", value: 102 },
//       { date: "2024-06-23", value: 102.5 },
//     ],
//     threshold: 90,
//   });

//   const [bloodPressure, setBloodPressure] = useState({
//     id: "Blood Pressure",
//     data: [
//       { date: "2023-01-15", value: 110 },
//       { date: "2023-03-15", value: 115 },
//       { date: "2023-06-15", value: 120 },
//       { date: "2023-09-15", value: 125 },
//     ],
//     threshold: 120,
//   });

//   // const [bloodSugar, setBloodSugar] = useState({
//   //   id: "blood sugar",
//   //   data: [
//   //     { date: "2023-01-15", value: 80 },
//   //     { date: "2023-03-25", value: 90 },
//   //     { date: "2023-06-05", value: 100 },
//   //     { date: "2023-08-15", value: 110 },
//   //   ],
//   //   threshold: 100,
//   // });

//   const [temperature, setTemperature] = useState({
//     id: "temperature",
//     data: [
//       { date: "2023-01-15", value: 98.0 },
//       { date: "2023-04-30", value: 98.6 },
//       { date: "2023-08-15", value: 99.2 },
//     ],
//     threshold: 99.0,
//   });

//   const parameters = [weight, bloodPressure,temperature];
  
//   const formatDate = (dateString) => {
//     if (!dateString || isNaN(new Date(dateString).getTime())) return "";
//     return format(new Date(dateString), "MMM d");
//   };

//   const handleCardClick = (parameter) => {
//     setSelectedParameter(parameter);
//     setOpenModal(true);
//   };

//   const handleSaveChanges = (newData) => {
//     switch (selectedParameter.id) {
//       case 'weight':
//         setWeight((prev) => ({ ...prev, data: newData }));
//         break;
//       case 'Blood Pressure':
//         setBloodPressure((prev) => ({ ...prev, data: newData }));
//         break;
//       // case 'Blood Sugar':
//       //   setBloodSugar((prev) => ({ ...prev, data: newData }));
//       //   break;
//       case 'temperature':
//         setTemperature((prev) => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error('Unknown parameter:', selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg w-full shadow-lg rounded-lg p-6 border border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Vitals</h2>
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

// export default SelfMonitoringParametersGraph;






import { useState } from "react";
import GraphModal from "../modals/graphModal.jsx";
import GraphsCard from "./graphsCard.jsx";
import { format } from "date-fns";

const SelfMonitoringParametersGraph = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  // Default parameters (blood sugar removed)
  const [parameters, setParameters] = useState([
    {
      id: "weight",
      data: [
        { date: "2023-08-27", value: 81 },
        { date: "2023-09-03", value: 81.5 },
        { date: "2023-09-10", value: 82 },
      ],
      threshold: 90,
      unit: "kg",
    },
    {
      id: "blood pressure",
      data: [
        { date: "2023-01-15", value: 110 },
        { date: "2023-03-15", value: 115 },
        { date: "2023-06-15", value: 120 },
      ],
      threshold: 120,
      unit: "mmHg",
    },
    {
      id: "temperature",
      data: [
        { date: "2023-01-15", value: 98.0 },
        { date: "2023-04-30", value: 98.6 },
        { date: "2023-08-15", value: 99.2 },
      ],
      threshold: 99.0,
      unit: "°F",
    },
  ]);

  // For new graph modal
  const [showNewGraphModal, setShowNewGraphModal] = useState(false);
  const [newGraphName, setNewGraphName] = useState("");
  const [newGraphUnit, setNewGraphUnit] = useState("");

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return "";
    return format(new Date(dateString), "MMM d");
  };

  const handleCardClick = (parameter) => {
    setSelectedParameter(parameter);
    setOpenModal(true);
  };

  const handleSaveChanges = (newData) => {
    setParameters((prev) =>
      prev.map((param) =>
        param.id === selectedParameter.id ? { ...param, data: newData } : param
      )
    );
    setOpenModal(false);
  };

  const handleAddNewGraph = () => {
    if (!newGraphName.trim()) return;
    const newGraph = {
      id: newGraphName.trim().toLowerCase(),
      data: [],
      threshold: null,
      unit: newGraphUnit || "",
    };
    setParameters((prev) => [...prev, newGraph]);
    setNewGraphName("");
    setNewGraphUnit("");
    setShowNewGraphModal(false);
  };

  return (
    <div>
      <div className="bg-white bg-opacity-45 backdrop-blur-lg w-full shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Vitals</h2>
          <button
            onClick={() => setShowNewGraphModal(true)}
            className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-700"
          >
            +
          </button>
        </div>

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

        {/* Modal for Adding New Graph */}
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

export default SelfMonitoringParametersGraph;
