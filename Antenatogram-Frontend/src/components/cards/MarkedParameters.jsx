import { useState } from "react";
import { format } from "date-fns";
import GraphModal from "../modals/graphModal.jsx";
import GraphsCard from "./graphsCard.jsx";

const MarkedParameters = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  const [hemoglobin, setHemoglobin] = useState({
    id: "Hemoglobin",
    color: 'hsl(220, 90%, 50%)',
    data: [
      { date: '2023-01-15', value: 12.5 },
      { date: '2023-03-15', value: 13.0 },
      { date: '2023-06-15', value: 13.5 },
      { date: '2023-09-15', value: 14.0 },
    ],
    threshold: 13.0,
    unit: "g/dL",
  });

  const [glucoseTolerance, setGlucoseTolerance] = useState({
    id: "Glucose Tolerance",
    color: 'hsl(0, 100%, 50%)',
    data: [
      { date: '2023-01-15', value: 130 },
      { date: '2023-03-15', value: 135 },
      { date: '2023-06-15', value: 140 },
      { date: '2023-09-15', value: 145 },
    ],
    threshold: 140,
    unit: "mg/dL",
  });
  const [bloodSugar, setBloodSugar] = useState({
    id: "Blood Sugar",
    color: 'hsl(200, 70%, 50%)',
    data: [
      { date: "2023-01-15", value: 80 },
      { date: "2023-03-25", value: 90 },
      { date: "2023-06-05", value: 100 },
      { date: "2023-08-15", value: 110 },
    ],
    threshold: 100,
    unit: "mg/dL",
  });

  const parameters = [hemoglobin, glucoseTolerance, bloodSugar];

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return "";
    return format(new Date(dateString), "MMM d");
  };

  const handleCardClick = (parameter) => {
    setSelectedParameter(parameter);
    setOpenModal(true);
  };

  const handleSaveChanges = (newData) => {
    switch (selectedParameter.id) {
      case 'Hemoglobin':
        setHemoglobin((prev) => ({ ...prev, data: newData }));
        break;
      case 'Glucose Tolerance':
        setGlucoseTolerance((prev) => ({ ...prev, data: newData }));
        break;
      case 'Blood Sugar':
        setBloodSugar((prev) => ({ ...prev, data: newData }));
        break;
      default:
        console.error('Unknown parameter:', selectedParameter.id);
    }
    setOpenModal(false);
  };

  return (
    <div className="w-full">
      <div className="bg-white bg-opacity-45 backdrop-blur-lg w-full shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">Biochemical Parameters</h2>
          <div className="flex flex-wrap gap-4">
            <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} />
          </div>
          {selectedParameter && (
            <GraphModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              selectedParameter={selectedParameter}
              onSave={handleSaveChanges}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkedParameters;
