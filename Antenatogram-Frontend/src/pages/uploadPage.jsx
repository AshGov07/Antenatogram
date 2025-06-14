import React, { useState } from 'react';

const UploadReport = () => {
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState(null);
  const [parameters, setParameters] = useState({});
  const [extractedText, setExtractedText] = useState('');

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    setParameters({});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParameters(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('File Type:', fileType);
    console.log('Uploaded File:', file);
    console.log('Entered Parameters:', parameters);

    // Create FormData object to send file and parameters
    const formData = new FormData();
    formData.append('fileType', fileType);
    formData.append('report', file); // Changed 'file' to 'report' to match backend expectation
    for (const key in parameters) {
      formData.append(key, parameters[key]);
    }

    // Send data to the server (replace with your actual API endpoint)
    try {
      const response = await fetch('/report/process', { // Replace '/api/upload' with your backend endpoint
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Report processed successfully!', responseData);
        setExtractedText(responseData.extractedText);
        alert('Report uploaded successfully!'); // Show success message
      } else {
        try {
          const errorData = await response.json(); // Try to get error details from the server
          console.error('Failed to upload report:', errorData);
          alert(`Failed to upload report: ${errorData.message || 'Unknown error'}`); // Show error message
        } catch (jsonError) {
          console.error('Failed to parse error JSON:', jsonError);
          alert('Failed to upload report: ' + response.statusText); // Show status text if JSON parsing fails
        }
      }
    } catch (error) {
      console.error('Error uploading report:', error);
      alert('Error uploading report: ' + error.message); // Show network error
      // Handle network errors or other exceptions
    }
  };

  const renderFormFields = () => {
    switch (fileType) {
      case 'Blood Test':
        return (
          <div className="space-y-4">
            <label className="block">
              Hemoglobin:
              <input type="text" name="hemoglobin" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="block">
              White Blood Cells:
              <input type="text" name="wbc" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="block">
              Platelets:
              <input type="text" name="platelets" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
          </div>
        );
      case 'Ultrasound':
        return (
          <div className="space-y-4">
            <label className="block">
              Fetal Heart Rate:
              <input type="text" name="fetalHeartRate" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="block">
              Gestational Age:
              <input type="text" name="gestationalAge" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="block">
              Placenta Position:
              <input type="text" name="placentaPosition" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
          </div>
        );
      case 'Glucose Tolerance Test':
        return (
          <div className="space-y-4">
            <label className="block">
              Fasting Blood Sugar:
              <input type="text" name="fastingBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="block">
              1 Hour Blood Sugar:
              <input type="text" name="oneHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label className="block">
              2 Hour Blood Sugar:
              <input type="text" name="twoHourBloodSugar" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
            <label className="block text-gray-700 font-medium">
              Choose Report Type:
              <select value={fileType} onChange={handleFileTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select a report type</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Glucose Tolerance Test">Glucose Tolerance Test</option>
              </select>
            </label>
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Upload File:
              <input type="file" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
          </div>
          {renderFormFields()}
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
        {extractedText && (
          <div className="mt-4 p-4 border rounded">
            <h2 className="text-lg font-semibold">Extracted Text:</h2>
            <p>{extractedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadReport;
