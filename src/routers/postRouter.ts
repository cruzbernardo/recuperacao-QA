import { PostController } from "../controllers/PostController";
import { RequestHandler, Router } from "express";
import Container from "typedi";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

const router = Router();

const getController = (): PostController => {
  return Container.get<PostController>("PostController");
};

const createRouter = (): Router => {
  router.get("", (async (req, res) => {
    await getController().listar(req, res);
  }) as RequestHandler);
  router.get(
    "/:id",
    (async (req, res) =>
      await getController().buscar(req, res)) as RequestHandler
  );
  router.get(
    "/myposts", authenticationMiddleware,
    (async (req:RequestWithUserData, res) =>
      await getController().buscaPostsDoUsuario(req, res)) as RequestHandler
  );
  router.post(
    "/find",
    (async (req, res) =>
      await getController().buscaPostsPorTitulo(req, res)) as RequestHandler
  );
  router.post(
    "",authenticationMiddleware,
    (async (req:RequestWithUserData, res) =>
      await getController().criar(req, res)) as RequestHandler
  );
  router.patch(
    "/:id", authenticationMiddleware,
    (async (req:RequestWithUserData, res) =>
      await getController().atualizar(req, res)) as RequestHandler
  );
  router.delete(
    "/:id", authenticationMiddleware,
    (async (req:RequestWithUserData, res) =>
      await getController().remover(req, res)) as RequestHandler
  );

  return router;
};

export default createRouter;
