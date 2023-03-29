import { Router } from "express";
import RandomFilmController from "../controllers/randomFilm";

const router: Router = Router();

router.get("/", RandomFilmController.Find);

export default router;
