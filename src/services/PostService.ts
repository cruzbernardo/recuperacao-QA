import { IPostRepository } from "../@types/repositories/IPostRepository";
import { IPostService } from "../@types/services/IPostService";
import { Inject, Service } from "typedi";
import { Post } from "../models/PostEntity";
import {
  AtualizarPostDto,
  CriarPostDto,
} from "../@types/dto/PostDto";
import { postFactory } from "../dataMappers/post/postFactory";
import { PostNaoExiste } from "../@types/errors/PostNaoExiste";
import { atualizaPost } from "../dataMappers/post/atualizaPost";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { decode } from "jsonwebtoken";

@Service("PostService")
export class PostService implements IPostService {
  constructor(
    @Inject("PostRepository")
    private postRepository: IPostRepository,
  ) {}
  async listar(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    const postsTratados = posts.sort(function(a,b){
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    return postsTratados;
  }
  async buscar(postId: number): Promise<Post> {
    const post = await this.checaPost(postId);
    return post;
  }
  async criar(
    authorization: string, postDto: CriarPostDto
  ): Promise<Post> {
      const usuario = decode(authorization) as TokenPayload;
      postDto.usuarioId = usuario.id;
      const novoPost = postFactory(postDto);
      return await this.postRepository.save(
        novoPost
      );
  }
  async atualizar(authorization: string,
    id: number,
    postDtoAtualizado: AtualizarPostDto
  ): Promise<Post | void > {
    const usuario = decode(authorization) as TokenPayload;
    const post = await this.checaPost(id);
    if(post.usuario.id === usuario.id){
        const postAtualizado = atualizaPost(
        post,
        postDtoAtualizado
      );
      return await this.postRepository.save(postAtualizado);
    }
    
  }
  async remover(authorization: string,id: number): Promise<void> {
    const postPraRemover = await this.checaPost(id);
    const usuario = decode(authorization) as TokenPayload;
    if(postPraRemover.usuario.id === usuario.id)
    {
      await this.postRepository.remove(postPraRemover);
    }
    return;
  }
  async buscarPostsPorAutor(authorization:string): Promise<Post[]> {
    const usuario = decode(authorization) as TokenPayload;
    const postsDoUsuario =
      await this.postRepository.findPostsDoUsuario(usuario.id);
    return postsDoUsuario.sort(function(a,b){
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });;
  }
  async buscarPostsPorTitulo(titulo:string):Promise<Post[]> {
    return this.postRepository.findPostsPorTitulo(titulo);
  }
  
  private async checaPost(id: number): Promise<Post> {
    const Post = await this.postRepository.findPostCompleto(id);
    if (!Post) {
      throw new PostNaoExiste();
    }
    return Post;
  }
}
