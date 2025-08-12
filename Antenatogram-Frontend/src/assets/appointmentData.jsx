import { useState } from "react";

const appointmentData = () => {
    const [appointments, setAppointments] = useState([
        {
            doctor: 'Dr. Jacob Paul',
            date: '25/12/2024',
            summary: 'Discussed glucose tolerance results and adjusted diet plan.',
            location: "Chennai",
            prescriptionImage: "./download.jpg",
            testdetails: [
                {
                    name: 'Glucose Tolerance Test',
                    date: '23/12/2024',
                    results: '120 mg/dL (Normal)',
                    comments: 'Recommended to monitor regularly.',
                    status: 'result available'
                },
                {
                    name: 'Hemoglobin Test',
                    date: '20/12/2024',
                    results: '13.5 g/dL',
                    comments: 'Levels within the normal range.',
                    status: 'result available'
                },
            ],
        },
        {
            doctor: 'Dr. Jacob Paul',
            date: '18/11/2024',
            summary: 'Blood pressure and hemoglobin levels were checked.',
            location: "Chennai",
            prescriptionImage: "./download.jpg",
            testdetails: [
                {
                    name: 'Blood Pressure Test',
                    date: '17/11/2024',
                    results: '120/80 mmHg',
                    comments: 'Normal blood pressure reading.',
                    status: 'result available'
                },
                {
                    name: 'Complete Blood Count (CBC)',
                    date: '16/11/2024',
                    results: 'All values within normal range.',
                    comments: 'No signs of anemia.',
                    status: 'result available'
                },
            ],
        },
        {
            doctor: 'Dr. Jacob Paul',
            date: '16/10/2024',
            summary: 'Routine check-up and discussed overall health.',
            location: "Chennai",
            prescriptionImage: "./download.jpg",
            testdetails: [
                {
                    name: 'Cholesterol Test',
                    date: '15/10/2024',
                    results: 'Total Cholesterol: 180 mg/dL',
                    comments: 'Cholesterol levels are healthy.',
                    status: 'result available'
                },
            ],
        },
        {
            doctor: 'Dr. Sweety',
            date: '30/09/2024',
            summary: 'Reviewed fetal measurements and growth.',
            prescriptionImage: "./download.jpg",
            testdetails: [
                {
                    name: 'Ultrasound',
                    date: '29/09/2024',
                    results: 'Fetal growth normal, no abnormalities detected.',
                    comments: 'Everything is progressing normally.',
                    status: 'test prescribed'
                },
            ],
        },
        {
            doctor: 'Dr. Santhosh',
            date: '14/08/2024',
            summary: 'Initial consultation and health assessment.',
            location: "Chennai",
            prescriptionImage: "./download.jpg",
            testdetails: [
                {
                    name: 'Initial Blood Work',
                    date: '13/08/2024',
                    results: 'All values within normal range.',
                    comments: 'No concerns from the initial bloodwork.',
                    status: 'test taken'
                },
            ],
        },
    ]);

    return { appointments, setAppointments };
};

export default appointmentData;