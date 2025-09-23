import { useState } from 'react';
import { Link } from 'react-router-dom';

const AllPatients = () => {
  const [patients, setPatients] = useState([
    { 
      name: 'Saanvi Patel', 
      id: 'P001', 
      phone: '1234567890', 
      demographics: {
        age: 30, 
        gender: 'Female', 
        address: '123 XYZ Street, CityA', 
        bloodGroup: 'O+'
      }
    },
    { 
      name: 'Aadhya Singh', 
      id: 'P002', 
      phone: '2345678901', 
      demographics: {
        age: 25, 
        gender: 'Female', 
        address: '456 ABC Street, CityB', 
        bloodGroup: 'A+'
      }
    },
    { 
      name: 'Ananya Rao', 
      id: 'P003', 
      phone: '3456789012', 
      demographics: {
        age: 29, 
        gender: 'Female', 
        address: '789 LMN Street, CityC', 
        bloodGroup: 'B+'
      }
    },
    { 
      name: 'Aarohi Kapoor', 
      id: 'P004', 
      phone: '4567890123', 
      demographics: {
        age: 32, 
        gender: 'Female', 
        address: '321 DEF Street, CityD', 
        bloodGroup: 'AB+'
      }
    },
    { 
      name: 'Diya Sharma', 
      id: 'P005', 
      phone: '5678901234', 
      demographics: {
        age: 27, 
        gender: 'Female', 
        address: '654 GHI Street, CityE', 
        bloodGroup: 'O-'
      }
    },
    { 
      name: 'Myra Reddy', 
      id: 'P006', 
      phone: '6789012345', 
      demographics: {
        age: 31, 
        gender: 'Female', 
        address: '987 JKL Street, CityF', 
        bloodGroup: 'A-'
      }
    },
    { 
      name: 'Anika Gupta', 
      id: 'P007', 
      phone: '7890123456', 
      demographics: {
        age: 28, 
        gender: 'Female', 
        address: '123 MNO Street, CityG', 
        bloodGroup: 'B-'
      }
    },
    { 
      name: 'Navya Joshi', 
      id: 'P008', 
      phone: '8901234567', 
      demographics: {
        age: 33, 
        gender: 'Female', 
        address: '456 PQR Street, CityH', 
        bloodGroup: 'AB-'
      }
    },
    { 
      name: 'Ira Bhatia', 
      id: 'P009', 
      phone: '9012345678', 
      demographics: {
        age: 26, 
        gender: 'Female', 
        address: '789 STU Street, CityI', 
        bloodGroup: 'O+'
      }
    },
    { 
      name: 'Saanvika Nair', 
      id: 'P010', 
      phone: '1123456789', 
      demographics: {
        age: 24, 
        gender: 'Female', 
        address: '123 VWX Street, CityJ', 
        bloodGroup: 'A+'
      }
    },
    { 
      name: 'Riya Mehta', 
      id: 'P011', 
      phone: '2234567890', 
      demographics: {
        age: 29, 
        gender: 'Female', 
        address: '456 YZA Street, CityK', 
        bloodGroup: 'B+'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('name');
  const [expandedPatient, setExpandedPatient] = useState(null);

  const toggleExpand = (patientId) => {
    setExpandedPatient((prev) => (prev === patientId ? null : patientId));
  };

  const sortPatients = (order) => {
    const sortedPatients = [...patients].sort((a, b) => {
      if (order === 'asc') return a.name.localeCompare(b.name);
      if (order === 'desc') return b.name.localeCompare(a.name);
      return 0;
    });
    setPatients(sortedPatients);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    sortPatients(order);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterByChange = (e) => {
    setFilterBy(e.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    if (filterBy === 'name') {
      return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'phone') {
      return patient.phone.includes(searchTerm);
    }
    return true;
  });

  return (
    <div className="pt-20 px-4 h-full w-full">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Patients</h2>
          <div className="flex items-center">
            <input
              type="text"
              className="border border-gray-300 rounded p-2 mr-4"
              placeholder={`Search by ${filterBy}`}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              className="border border-gray-300 rounded p-2 mr-4"
              value={filterBy}
              onChange={handleFilterByChange}
            >
              <option value="name">Filter by Name</option>
              <option value="phone">Filter by Phone</option>
            </select>
            <select
              className="border border-gray-300 rounded p-2"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="asc">Sort by Name (A-Z)</option>
              <option value="desc">Sort by Name (Z-A)</option>
            </select>
          </div>
        </div>
        <ul className="divide-y divide-gray-300">
          {filteredPatients.map((patient, index) => (
            <li key={index} className="py-2">
              <div className="flex justify-between items-center">
                <Link to={'/user'} className="font-semibold">
                  {patient.name}
                </Link>
                <button
                  className="ml-4 text-gray-500 hover:text-gray-700"
                  onClick={() => toggleExpand(patient.id)}
                >
                  {expandedPatient === patient.id ? '▲' : '▼'}
                </button>
              </div>
              <div className="text-sm text-gray-500">ID: {patient.id}</div>
              <div className="text-sm text-gray-500">Phone: {patient.phone}</div>
              {expandedPatient === patient.id && (
                <div className="text-sm text-gray-500 mt-2">
                  <div>Age: {patient.demographics.age}</div>
                  <div>Gender: {patient.demographics.gender}</div>
                  <div>Address: {patient.demographics.address}</div>
                  <div>Blood Group: {patient.demographics.bloodGroup}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllPatients;
 