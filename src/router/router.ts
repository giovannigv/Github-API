import express from 'express';
import repositoryRouter from "../routes/RepositoryRoute";

const router = express.Router();

router.use("/api/github", repositoryRouter);

export default router;