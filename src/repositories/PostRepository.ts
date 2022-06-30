import { IPostRepository } from "../@types/repositories/IPostRepository";
import { Post } from "../models/PostEntity";
import { EntityRepository, Like, Repository } from "typeorm";

@EntityRepository(Post)
export class PostRepository
  extends Repository<Post>
  implements IPostRepository
{
  findPostsPorTitulo(titulo:string): Promise<Post[]> {
    return this.find({
      where: {
        titulo: Like(`%${titulo}%`),       
      },
    });
  }
  
  findPostCompleto(postId: number): Promise<Post> {
    return this.findOne({
      relations: [
        "comments"
      ],
      where: {
        id: postId,
        comment_id: null,
      },
    });
  }

  findPostsDoUsuario(usuarioId: number): Promise<Post[]>{
    return this.find({
      where: {
        usuarioId:usuarioId
      }
    })
  }
  
}
