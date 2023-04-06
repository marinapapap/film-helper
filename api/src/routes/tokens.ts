import { Router } from "express";
import { TokensController } from "../controllers/tokens";

const router: Router = Router();

router.post("/login", TokensController.Create);
router.get("/logout", TokensController.Clear);
router.get("/validate", TokensController.Check);

export default router;
