import { Router } from "express";
import { RandomFilmController } from "../controllers/savedFilms";

const router: Router = Router();

router.delete("/film", RandomFilmController.RemoveFilm);
router.post("/films", RandomFilmController.SaveFilm);
router.get("/films", RandomFilmController.GetFilms);

export default router;
