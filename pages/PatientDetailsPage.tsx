// pages/PatientDetailsPage.tsx
import React from 'react';
import { PatientDashboard } from '../components/PatientDashboard.tsx';

const PatientDetailsPage: React.FC = () => {
    return (
        <PatientDashboard
            patientListEndpoint="https://healthgestbackend.onrender.com/api/patients"
            dashboardApiEndpoint="https://healthgestbackend.onrender.com/api/patientDetails" // <-- CHANGED
            selectorLabel="Select Patient"
            noPatientsMessage="No patients found"
            isOngoing={false}
        />
    );
};

export default PatientDetailsPage;