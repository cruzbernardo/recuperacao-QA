import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { ICommentService } from "../@types/services/ICommentService";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { CommentNaoExiste } from "../@types/errors/CommentNaoExiste";


@Service("CommentController")
export class CommentController {
  constructor(
    @Inject("CommentService")
    private commentService: ICommentService
  ) {}


  async buscar(request: Request, response: Response): Promise<void> {
    try {
      const comment = await this.commentService.buscarComentarios(
        Number(request.params.id)
      );
      response.send(comment).status(200);
      return;
    } catch (error) {
      if (error instanceof CommentNaoExiste) {
        response.status(404).send();
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }

  async criar(request: RequestWithUserData, response: Response): Promise<void> {
    try {
      const authorization = request.headers.authorization;
      const comment =
        await this.commentService.criar(
          authorization,
          request.body
        );
      response.send(comment).status(201);
      return;
    } catch (error) {
      response.status(500).send("erro interno do servidor");
    }
  }

  async atualizar(request: RequestWithUserData, response: Response): Promise<void> {
    try {
      const authorization = request.headers.authorization
      const CommentAtualizado = await this.commentService.atualizar(authorization,
        Number(request.params.id),
        request.body
      );
      response.send(CommentAtualizado).status(200);
      return;
    } catch (error) {
      if (error instanceof CommentNaoExiste) {
        response.status(404).send();
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }

  async remover(request: RequestWithUserData, response: Response): Promise<void> {
    const authorization = request.headers.authorization
    if (!request.params.id) {
      response.status(400);
      throw new Error("Informacoes incorretas");
    }
    await this.commentService.remover(authorization, Number(request.params.id));
    response.send().status(200);
  }

}
