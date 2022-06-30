import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IPostService } from "../@types/services/IPostService";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { PostNaoExiste } from "../@types/errors/PostNaoExiste";


@Service("PostController")
export class PostController {
  constructor(
    @Inject("PostService")
    private postService: IPostService
  ) {}

  async listar(request: Request, response: Response): Promise<void> {
    const Postes = await this.postService.listar();
    response.send(Postes).status(200);
    return;
  }

  async buscar(request: Request, response: Response): Promise<void> {
    try {
      const Post = await this.postService.buscar(
        Number(request.params.id)
      );
      response.send(Post).status(200);
      return;
    } catch (error) {
      if (error instanceof PostNaoExiste) {
        response.status(404).send();
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }

  async criar(request: RequestWithUserData, response: Response): Promise<void> {
    try {
      const authorization = request.headers.authorization;
      const post =
        await this.postService.criar(
          authorization,
          request.body
        );
      response.send(post).status(201);
      return;
    } catch (error) {
      response.status(500).send("erro interno do servidor");
    }
  }

  async atualizar(request: RequestWithUserData, response: Response): Promise<void> {
    try {
      const authorization = request.headers.authorization
      const postAtualizado = await this.postService.atualizar(authorization,
        Number(request.params.id),
        request.body
      );
      response.send(postAtualizado).status(200);
      return;
    } catch (error) {
      if (error instanceof PostNaoExiste) {
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
    await this.postService.remover(authorization, Number(request.params.id));
    response.send().status(200);
  }

  async buscaPostsDoUsuario(
    request: RequestWithUserData,
    response: Response
  ): Promise<void> {
    try {
      const authorization = request.headers.authorization
      const postsDoUsuario =
        await this.postService.buscarPostsPorAutor(authorization
        );
      response.send(postsDoUsuario).status(200);
      return;
    } catch (error) {
      if (error instanceof PostNaoExiste) {
        response.status(404).send();
      }
      response.status(500).send("erro interno do servidor");
    }
  }

  async buscaPostsPorTitulo(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const postsDisponiveis =
        await this.postService.buscarPostsPorTitulo(request.body
        );
      response.send(postsDisponiveis).status(200);
      return;
    } catch (error) {
      if (error instanceof PostNaoExiste) {
        response.status(404).send();
      }
      response.status(500).send("erro interno do servidor");
    }
  }
}
