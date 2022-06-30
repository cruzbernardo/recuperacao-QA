import { Usuario } from "../../models/UsuarioEntity";
import { PostDto } from "../../@types/dto/PostDto";
import { Post } from "../../models/PostEntity";

export const postFactory = (novoPost: PostDto): Post => {
  const post = new Post();
  const usuario = new Usuario()
  post.titulo = novoPost.titulo;
  post.descricao = novoPost.descricao;
  usuario.id = novoPost.usuarioId;
  post.usuario = usuario;
  return post;
};
