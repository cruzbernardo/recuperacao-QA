/* eslint-disable prettier/prettier */
import * as express from "express";
import createUsuarioRouter from "./usuarioRouter";
import createAuthenticationRouter from "./sign-inRouter"
import createPostRouter from "./postRouter";
import createCommentRouter from "./commentRouter";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

const createRouters = (app: express.Express): void => {
  app.use("/usuarios/sign-in", createAuthenticationRouter());
  app.use("/usuarios", createUsuarioRouter());
  app.use("/posts", createPostRouter());
  app.use("/posts/", createCommentRouter());

};

export default createRouters;
