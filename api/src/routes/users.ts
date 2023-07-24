import { Router } from "express";
import { UsersController } from "../controllers/users";

const router: Router = Router();

router.use((req, res, next) => {
  console.log(`Received ${req.method} request to URL: ${req.url}`);
  next();
});

router.post("/", UsersController.Create);
router.post("/films", UsersController.SaveFilm);
router.get("/films", UsersController.GetFilms);
// router.delete("/film", UsersController.RemoveFilm);

export default router;
