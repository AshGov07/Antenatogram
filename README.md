# Antenatogram

Antenatogram is a web application designed for managing antenatal care. It provides features for both patients and doctors, including appointment management, medical history tracking, and report uploads.

## Features

### For Patients:
- View and manage personal medical history.
- Upload medical reports (e.g., blood tests, ultrasounds).
- View appointment history and summaries.

### For Doctors:
- View and manage patient details.
- Track patient risk levels and medical history.
- Manage appointments and summaries.

---

## Tech Stack

### Frontend:
- **React**: For building the user interface.
- **Tailwind CSS**: For styling.
- **Flowbite**: For prebuilt UI components.
- **Chart.js**: For visualizing data in graphs.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: For building REST APIs.
- **MySQL**: For database management.
- **JWT**: For authentication and authorization.

---

## Installation

### Prerequisites:
- Node.js and npm installed.
- MySQL installed and running.

### Clone the Repository:
```bash
git clone https://github.com/AshGov07/Antenatogram.git
cd Antenatogram
```

### Setup Frontend:
1. Navigate to the frontend folder:
   ```bash
   cd Antenatogram-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Setup Backend:
1. Navigate to the backend folder:
   ```bash
   cd ../Antenatogram-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder with the following content:
   ```
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

---

## Usage

1. Open the frontend in your browser:
   ```
   http://localhost:3000
   ```
2. Login as a patient or doctor to access the respective features.

---

## Folder Structure

### Frontend:
- **src/components**: Reusable UI components.
- **src/pages**: Pages for routing.
- **src/context**: Context for managing global state.
- **src/hooks**: Custom React hooks.

### Backend:
- **src/components**: API services (e.g., authentication).
- **database**: Database schemas and methods.
- **src/utils**: Utility functions (e.g., JWT handling).

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the Apache-2.0 license.

---

## Contact

For any questions or feedback, please reach out to [AshGov07](https://github.com/AshGov07).
