import { Post } from "../../models/PostEntity";

export interface IPostRepository {
  save(Post: Post): Promise<Post>;
  findOne(postId:number): Promise<Post>;
  find(): Promise<Post[]>;
  findPostCompleto(id: number): Promise<Post>;
  findPostsDoUsuario(usuarioId: number): Promise<Post[]>;
  findPostsPorTitulo(titulo: string): Promise<Post[]>;
  remove(entities: Post | Post[]): Promise<Post[]>;
}
