import { Router } from "express";
import { TokensController } from "../controllers/tokens";

const router: Router = Router();

router.get("/", TokensController.Create);

export default router;
