import { Router } from "express";
import { UsersController } from "../controllers/users";

const router: Router = Router();

router.post("/", UsersController.Create);
router.post("/films", UsersController.SaveFilm);

export default router;
