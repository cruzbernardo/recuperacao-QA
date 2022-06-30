import { CommentController } from "../controllers/CommentController";
import { RequestHandler, Router } from "express";
import Container from "typedi";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
const router = Router();

const getController = (): CommentController => {
  return Container.get<CommentController>("CommentController");
};

const createRouter = (): Router => {
  router.get(
    ":post_id/comments/:id",
    (async (req, res) =>
      await getController().buscar(req, res)) as RequestHandler
  );
  router.post(
    ":post_id/comments", authenticationMiddleware,
    (async (req:RequestWithUserData, res) =>
      await getController().criar(req, res)) as RequestHandler
  );
  router.patch(
    ":post_id/comments/:id", authenticationMiddleware,
    (async (req:RequestWithUserData, res) =>
      await getController().atualizar(req, res)) as RequestHandler
  );
  router.delete(
    ":post_id/comments/:id", authenticationMiddleware,
    (async (req:RequestWithUserData, res) =>
      await getController().remover(req, res)) as RequestHandler
  );

  return router;
};

export default createRouter;
