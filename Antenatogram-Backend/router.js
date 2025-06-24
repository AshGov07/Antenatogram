import { Router } from "express"
import { authRouter } from "./src/components/auth/authRouter.js";
import { createLog } from "./src/middleware/logger.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { pregnancyRouter } from "./src/components/pregnancy/pregnancyRouter.js";
import { patientsRouter } from './routes/patients.js';
import { sharedRouter } from './routes/shared.js';
import { measurementServices } from "./src/components/pregnancy/measurements/measurementServices.js";

export const mainRouter = Router();

mainRouter.use('/*', createLog);

mainRouter.use('/auth', authRouter);

mainRouter.use('/pregnancy', pregnancyRouter);

// Add measurement routes
mainRouter.post('/api/measurements/update', async (req, res, next) => {
    try {
        await measurementServices.update(req, res, next);
    } catch (error) {
        next(error);
    }
});

mainRouter.use('/api/patients', patientsRouter);

mainRouter.use('/api/shared', sharedRouter);

mainRouter.use(errorHandler);