import express, { Request, Response } from "express";
import RepositoryMiddleware from "../Middleware/RepositoryMiddleware";
import RepositoryController from "../controller/RepositoryController";
const router = express.Router()

router.get('/:id/repositories', async (req: Request, res: Response) => {
    const accept = req.header('Accept');
    const { id } = req.params;
    try {
        // To validate if the Accept Header is valid
        RepositoryMiddleware.verifyAcceptHeader(accept);

        res.json(await RepositoryController.getRepositories(id));

    } catch (error) {
        res.status(error.status).json(error)
    }
});

export default router;
