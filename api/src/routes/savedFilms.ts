import { Router } from "express";
import { RandomFilmController } from "../controllers/savedFilms";

const router: Router = Router();

router.delete("/film", RandomFilmController.RemoveFilm);

export default router;
