import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Select from 'react-select';
import SelfMonitoringParametersGraph from '../components/cards/selfMonitoringGraphs';
import MarkedParameters from '../components/cards/MarkedParameters';
import FoetalMeasurementsGraph from '../components/cards/foetalGraphs';

const SharedPatientData = () => {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedGraphs, setSelectedGraphs] = useState([]);
  const { linkId } = useParams();

  const graphOptions = [
    { value: 'selfMonitoring', label: 'Self Monitoring Parameters' },
    { value: 'markedParameters', label: 'Marked Parameters' },
    { value: 'foetalMeasurements', label: 'Foetal Measurements' }
  ];

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const response = await axios.get(`/api/shared/${linkId}`);
        setPatientData(response.data);
      } catch (err) {
        setError('This link is invalid or has expired');
      }
    };
    fetchSharedData();
  }, [linkId]);

  const handleDownload = () => {
    if (!patientData) return;

    const selectedData = {
      patientInfo: {
        name: patientData?.patientInfo?.name || 'Unknown Patient', // Use optional chaining and default value
        email: patientData?.patientInfo?.email || 'No Email' // Use optional chaining and default value
      },
      measurements: selectedGraphs.reduce((acc, graph) => {
        if (patientData?.measurements && patientData.measurements[graph.value]) {
          acc[graph.value] = patientData.measurements[graph.value];
        } else {
          acc[graph.value] = [];
        }
        return acc;
      }, {})
    };

    const blob = new Blob([JSON.stringify(selectedData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patientData?.patientInfo?.name || 'shared'}_health_data.json`; // Use optional chaining and default value
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return <div className="text-center text-red-600 mt-8">{error}</div>;
  }

  if (!patientData) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gradstart to-gradend">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">{patientData?.patientInfo?.name ? `${patientData.patientInfo.name}'s Health Data` : 'Shared Health Data'}</h1>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Graphs to View:</label>
            <Select
              isMulti
              options={graphOptions}
              onChange={setSelectedGraphs}
              className="mb-4"
            />
            <button
              onClick={handleDownload}
              disabled={selectedGraphs.length === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Download Selected Data
            </button>
          </div>

          <div className="space-y-6">
            {selectedGraphs.map((graph) => (
              <div key={graph.value} className="border p-4 rounded">
                {graph.value === 'selfMonitoring' && (
                  <SelfMonitoringParametersGraph readOnly={true} data={patientData?.measurements?.selfMonitoring} />
                )}
                {graph.value === 'markedParameters' && (
                  <MarkedParameters readOnly={true} data={patientData?.measurements?.markedParameters} />
                )}
                {graph.value === 'foetalMeasurements' && (
                  <FoetalMeasurementsGraph readOnly={true} data={patientData?.measurements?.foetalMeasurements} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedPatientData;
