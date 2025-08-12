import './landingPage.css';
const LandingPage = () => {
  return (
    <div className="mt-1/12 md:mt-0 h-screen p-1/12 flex flex-col items-center">
      <main className="container mx-auto flex-grow px-4 py-8">
        <section className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl font-bold mb-4">Manage Pregnancy Data with Ease</h2>
          <p className="text-lg text-gray-700">
            A comprehensive system to manage patient information, medical records, and doctor appointments seamlessly.
          </p>
        </section>
        <section id="features" className="mb-12 fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-center fade-in-up">
              <h4 className="text-xl font-bold mb-2">Patient Information</h4>
              <p>Manage patient details including personal information, address, and contact details.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center fade-in-up">
              <h4 className="text-xl font-bold mb-2">Medical History</h4>
              <p>Track medical history, medications, allergies, and more to provide comprehensive care.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center fade-in-up">
              <h4 className="text-xl font-bold mb-2">Appointments</h4>
              <p>Schedule and manage patient appointments with doctors, including visit summaries.</p>
            </div>
          </div>
        </section>
        <section id="benefits" className="mb-12 fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-center fade-in-up">
              <h4 className="text-xl font-bold mb-2">Improved Patient Care</h4>
              <p>Access complete patient data to provide personalized and effective care.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center fade-in-up">
              <h4 className="text-xl font-bold mb-2">Efficient Management</h4>
              <p>Simplify the management of patient information and medical records.</p>
            </div>
          </div>
        </section>
        <section id="contact" className="text-center mb-12 fade-in-up">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p>If you have any questions or need assistance, please contact us at <a href="mailto:support@pregnancymanagement.com" className="text-blue-600 hover:underline">support@pregnancymanagement.com</a>.</p>
        </section>
      </main>
      <footer className="w-screen bg-blue-600 text-white py-4 text-center">
        <p>&copy; 2024 AntenatApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
