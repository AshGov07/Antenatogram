import express from 'express';
import { json, urlencoded } from 'body-parser';
import { authRouter } from './components/auth/authRouter.js';
import { userRouter } from './components/user/userRouter.js';
import { patientRouter } from './components/patient/patientRouter.js';
import { doctorRouter } from './components/doctor/doctorRouter.js';
import { appointmentRouter } from './components/appointment/appointmentRouter.js';
import { reportRouter } from './components/reports/reportRouter.js';
import { measurementRouter } from './components/pregnancy/measurements/measurementRouter.js';
import { DBError } from './utils/Errors.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use('/appointment', appointmentRouter);
app.use('/report', reportRouter);
app.use('/measurement', measurementRouter);

app.use((err, req, res, next) => {
    if (err instanceof DBError) {
        return res.status(500).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;