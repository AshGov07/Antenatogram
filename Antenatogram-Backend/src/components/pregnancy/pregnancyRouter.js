// import { Router } from "express";
// import { measurementsRouter } from "./measurements/measurementsRouter.js";
// import { appointmentRouter } from "./apointments/appointmentsRouter.js";
// import {pregnancyServices} from "./pregnancyServices.js";

// export const pregnancyRouter = Router();

// pregnancyRouter.post('/currentPregnancy', pregnancyServices.getLivePregnancy);
// pregnancyRouter.post('/addPregnancy', pregnancyServices.addPregnancy);
// pregnancyRouter.use('/records', measurementsRouter);
// pregnancyRouter.use('/appointments',appointmentRouter );

import { Router } from "express";
import express from "express"; // ✅ NEW IMPORT
import { measurementsRouter } from "./measurements/measurementsRouter.js";
import { appointmentRouter } from "./apointments/appointmentsRouter.js";
import { pregnancyServices } from "./pregnancyServices.js";

export const pregnancyRouter = Router();
pregnancyRouter.use(express.json()); // ✅ This enables req.body parsing
pregnancyRouter.post('/currentPregnancy', pregnancyServices.getLivePregnancy);
pregnancyRouter.post('/addPregnancy', pregnancyServices.addPregnancy);
pregnancyRouter.get('/:patientId', pregnancyServices.getPregnancyIdByPatient); // ✅ new route
pregnancyRouter.use('/records', measurementsRouter);
pregnancyRouter.use('/appointments', appointmentRouter);
