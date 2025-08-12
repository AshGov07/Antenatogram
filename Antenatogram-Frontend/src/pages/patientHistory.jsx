import { Avatar } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientHistory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState({
    name: 'Mrs. Saanvi Patel',
    id: '9002',
    phone: '+91 9458329855',
    email: 'deepa.sharma@gmail.com',
    dob: '12/12/1988',
    aadhar: '1990 4308 9902 2239',
    nominee: 'Mr. Ramesh Sharma',
    nomineePhone: '9159983002',
    address: 'No 12, JD Avenue, Raman Street, T-Nagar, Chennai - 600099',
    height: '165cm',
    bloodGroup: 'O +ve',
    medications: 'any medication plus the dosage.',
    allergies: 'any allergies',
    illnessHistory: 'Thyroid: No\nHypertension: Yes\nDiabetes: No\nOther: Any other chronic illnesses',
    surgeryHistory: 'Any other surgeries in the past',
    lifestyleFactors: 'Social drinker, intermediate physical activity, mostly household work',
    previousDeliveries: '2 deliveries, 1 normal, 1 C-section',
    previousDischargeDetails: 'Last discharge on 25/03/2023 after C-section surgery.' // New field for previous discharge details
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const inputClass = isEditing ? "border border-gray-400 p-2 rounded w-full" : "";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-50 to-pink-100 py-8 px-4 mt-20">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        {/* Back Button */}
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/user')}
        >
          ← Back
        </button>
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 border-b pb-4 mb-6">
          <div className="flex items-center justify-center mb-4 md:mb-0">
            <Avatar rounded size="lg" />
          </div>
          <div className="flex flex-col flex-1">
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  name="name" 
                  value={patientData.name} 
                  onChange={handleChange} 
                  className={`text-2xl font-bold ${inputClass} mb-2`} 
                  placeholder="Name"
                />
                <p className="text-gray-600 mb-2">ID: 
                  <input 
                    type="text" 
                    name="id" 
                    value={patientData.id} 
                    onChange={handleChange} 
                    className={inputClass} 
                    placeholder="ID"
                  />
                </p>
                <p className="text-gray-600 mb-2">Phone: 
                  <input 
                    type="text" 
                    name="phone" 
                    value={patientData.phone} 
                    onChange={handleChange} 
                    className={inputClass} 
                    placeholder="Phone"
                  />
                </p>
                <p className="text-gray-600 mb-2">Email: 
                  <input 
                    type="text" 
                    name="email" 
                    value={patientData.email} 
                    onChange={handleChange} 
                    className={inputClass} 
                    placeholder="Email"
                  />
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{patientData.name}</h1>
                <p className="text-gray-600 mb-2">ID: {patientData.id}</p>
                <p className="text-gray-600 mb-2">Phone: {patientData.phone}</p>
                <p className="text-gray-600 mb-2">Email: {patientData.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <p className="font-bold">Height</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <input type="text" name="height" value={patientData.height} onChange={handleChange} className={inputClass} />
              ) : (
                patientData.height
              )}
            </p>
            <p className="font-bold">Blood Group</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <input type="text" name="bloodGroup" value={patientData.bloodGroup} onChange={handleChange} className={inputClass} />
              ) : (
                patientData.bloodGroup
              )}
            </p>
            <p className="font-bold">Medications</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <textarea name="medications" value={patientData.medications} onChange={handleChange} className={inputClass} />
              ) : (
                patientData.medications
              )}
            </p>
            <p className="font-bold">Allergies</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <textarea name="allergies" value={patientData.allergies} onChange={handleChange} className={inputClass} />
              ) : (
                patientData.allergies
              )}
            </p>
          </div>

          <div className="col-span-1 lg:col-span-2 space-y-4">
            <p className="font-bold">History of Illness</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <textarea className={`w-full ${inputClass}`} name="illnessHistory" value={patientData.illnessHistory} onChange={handleChange} />
              ) : (
                patientData.illnessHistory
              )}
            </p>
            <p className="font-bold">History of Surgery</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <textarea className={`w-full ${inputClass}`} name="surgeryHistory" value={patientData.surgeryHistory} onChange={handleChange} />
              ) : (
                patientData.surgeryHistory
              )}
            </p>
            <p className="font-bold">Lifestyle Factors</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <textarea className={`w-full ${inputClass}`} name="lifestyleFactors" value={patientData.lifestyleFactors} onChange={handleChange} />
              ) : (
                patientData.lifestyleFactors
              )}
            </p>
            <p className="font-bold">Previous Deliveries</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <textarea className={`w-full ${inputClass}`} name="previousDeliveries" value={patientData.previousDeliveries} onChange={handleChange} />
              ) : (
                patientData.previousDeliveries
              )}
            </p>
            <p className="font-bold">Previous Discharge Details</p>
            <p className="text-gray-600 mb-4">
              {isEditing ? (
                <textarea className={`w-full ${inputClass}`} name="previousDischargeDetails" value={patientData.previousDischargeDetails} onChange={handleChange} />
              ) : (
                patientData.previousDischargeDetails
              )}
            </p>
          </div>
        </div>

        {/* Edit/Save Button */}
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}

export default PatientHistory;
