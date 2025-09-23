//perfect working code (showed to doctor)


// import { useState } from "react";
// import { format } from "date-fns";
// import GraphModal from "../modals/graphModal.jsx";
// import GraphsCard from "./graphsCard.jsx";

// const MarkedParameters = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedParameter, setSelectedParameter] = useState(null);

//   const [hemoglobin, setHemoglobin] = useState({
//     id: "Hemoglobin",
//     color: 'hsl(220, 90%, 50%)',
//     data: [
//       { date: '2023-01-15', value: 12.5 },
//       { date: '2023-03-15', value: 13.0 },
//       { date: '2023-06-15', value: 13.5 },
//       { date: '2023-09-15', value: 14.0 },
//     ],
//     threshold: 13.0,
//     unit: "g/dL",
//   });

//   const [glucoseTolerance, setGlucoseTolerance] = useState({
//     id: "Glucose Tolerance",
//     color: 'hsl(0, 100%, 50%)',
//     data: [
//       { date: '2023-01-15', value: 130 },
//       { date: '2023-03-15', value: 135 },
//       { date: '2023-06-15', value: 140 },
//       { date: '2023-09-15', value: 145 },
//     ],
//     threshold: 140,
//     unit: "mg/dL",
//   });
//   const [bloodSugar, setBloodSugar] = useState({
//     id: "Blood Sugar",
//     color: 'hsl(200, 70%, 50%)',
//     data: [
//       { date: "2023-01-15", value: 80 },
//       { date: "2023-03-25", value: 90 },
//       { date: "2023-06-05", value: 100 },
//       { date: "2023-08-15", value: 110 },
//     ],
//     threshold: 100,
//     unit: "mg/dL",
//   });

//   const parameters = [hemoglobin, glucoseTolerance, bloodSugar];

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
//       case 'Hemoglobin':
//         setHemoglobin((prev) => ({ ...prev, data: newData }));
//         break;
//       case 'Glucose Tolerance':
//         setGlucoseTolerance((prev) => ({ ...prev, data: newData }));
//         break;
//       case 'Blood Sugar':
//         setBloodSugar((prev) => ({ ...prev, data: newData }));
//         break;
//       default:
//         console.error('Unknown parameter:', selectedParameter.id);
//     }
//     setOpenModal(false);
//   };

//   return (
//     <div className="w-full">
//       <div className="bg-white bg-opacity-45 backdrop-blur-lg w-full shadow-lg rounded-lg p-6 border border-gray-200">
//         <div className="w-full">
//           <h2 className="text-lg font-semibold mb-4">Biochemical Parameters</h2>
//           <div className="flex flex-wrap gap-4">
//             <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />
//           </div>
//           {selectedParameter && (
//             <GraphModal
//               openModal={openModal}
//               setOpenModal={setOpenModal}
//               selectedParameter={selectedParameter}
//               onSave={handleSaveChanges}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarkedParameters;




import { useState } from "react";
import { format } from "date-fns";
import GraphModal from "../modals/graphModal.jsx";
import GraphsCard from "./graphsCard.jsx";

const MarkedParameters = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  // Single source of truth (same pattern as Vitals)
  const [parameters, setParameters] = useState([
    {
      id: "hemoglobin",
      label: "Hemoglobin",
      data: [
        { date: "2023-01-15", value: 12.5 },
        { date: "2023-03-15", value: 13.0 },
        { date: "2023-06-15", value: 13.5 },
        { date: "2023-09-15", value: 14.0 },
      ],
      threshold: 13.0,
      unit: "g/dL",
    },
    {
      id: "glucose tolerance",
      label: "Glucose Tolerance",
      data: [
        { date: "2023-01-15", value: 130 },
        { date: "2023-03-15", value: 135 },
        { date: "2023-06-15", value: 140 },
        { date: "2023-09-15", value: 145 },
      ],
      threshold: 140,
      unit: "mg/dL",
    },
    {
      id: "blood sugar",
      label: "Blood Sugar",
      data: [
        { date: "2023-01-15", value: 80 },
        { date: "2023-03-25", value: 90 },
        { date: "2023-06-05", value: 100 },
        { date: "2023-08-15", value: 110 },
      ],
      threshold: 100,
      unit: "mg/dL",
    },
  ]);

  // New-graph modal (identical UX to Vitals)
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
      prev.map((p) =>
        p.id === (selectedParameter.id || selectedParameter.label?.toLowerCase())
          ? { ...p, data: newData }
          : p
      )
    );
    setOpenModal(false);
  };

  const handleAddNewGraph = () => {
    if (!newGraphName.trim()) return;
    const id = newGraphName.trim().toLowerCase();
    const newGraph = {
      id,
      label: newGraphName.trim(),
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
    <div className="w-full">
      <div className="bg-white bg-opacity-45 backdrop-blur-lg w-full shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Biochemical Parameters</h2>
          <button
            onClick={() => setShowNewGraphModal(true)}
            className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-700"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <GraphsCard
            parameters={parameters}
            handleCardClick={handleCardClick}
            formatDate={formatDate}
          />
        </div>

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

export default MarkedParameters;
