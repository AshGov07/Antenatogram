import { useState } from "react";
import useFormatDate from "../../hooks/useFormatDate.jsx";
import GraphModal from "../modals/graphModal.jsx";
import GraphsCard from "./graphsCard.jsx";

const FoetalMeasurementsGraph = ({ readOnly }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  const [headCircumference, setHeadCircumference] = useState({
    id: 'head circumference',
    data: [
      { date: '2023-01-15', value: 5 },
      { date: '2023-02-20', value: 10 },
      { date: '2023-03-25', value: 17 },
    ],
    threshold: 30,
  });

  const [abdominalCircumference, setAbdominalCircumference] = useState({
    id: 'abdominal circumference',
    data: [
      { date: '2023-01-15', value: 3 },
      { date: '2023-03-25', value: 15 },
      { date: '2023-06-05', value: 27 },
      { date: '2023-08-15', value: 35 },
    ],
    threshold: 25,
  });

  const [femurLength, setFemurLength] = useState({
    id: 'femur length',
    data: [
      { date: '2023-01-15', value: 2 },
      { date: '2023-04-30', value: 18 },
      { date: '2023-08-15', value: 34 },
    ],
    threshold: 20,
  });

  const [biparietalDiameter, setBiparietalDiameter] = useState({
    id: 'biparietal diameter',
    data: [
      { date: '2023-01-15', value: 1 },
      { date: '2023-03-25', value: 9 },
      { date: '2023-06-05', value: 19 },
      { date: '2023-08-15', value: 28 },
    ],
    threshold: 15,
  });

  const parameters = [headCircumference, abdominalCircumference, femurLength, biparietalDiameter];
  const formatDate = useFormatDate;

  const handleCardClick = (parameter) => {
    setSelectedParameter(parameter);
    setOpenModal(true);
  };

  const handleSaveChanges = (newData) => {
    switch (selectedParameter.id) {
      case 'head circumference':
        setHeadCircumference(prev => ({ ...prev, data: newData }));
        break;
      case 'abdominal circumference':
        setAbdominalCircumference(prev => ({ ...prev, data: newData }));
        break;
      case 'femur length':
        setFemurLength(prev => ({ ...prev, data: newData }));
        break;
      case 'biparietal diameter':
        setBiparietalDiameter(prev => ({ ...prev, data: newData }));
        break;
      default:
        console.error('Unknown parameter:', selectedParameter.id);
    }
    setOpenModal(false);
  };

  return (
    <div>
      <div className="bg-white bg-opacity-45 backdrop-blur-lg shadow-lg rounded-lg p-6 border w-full border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Foetal Measurements</h2>
        <GraphsCard parameters={parameters} handleCardClick={handleCardClick} formatDate={formatDate} readOnly={readOnly} />
        
        {selectedParameter && (
          <GraphModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedParameter={selectedParameter}
            onSave={handleSaveChanges}
            graphName={selectedParameter.id} // Pass the graph name
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  );
};

export default FoetalMeasurementsGraph;
