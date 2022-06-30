import { Usuario } from "../../models/UsuarioEntity";
import { CommentDto } from "../../@types/dto/CommentDto";
import { Comment } from "../../models/CommentEntity";

export const commentFactory = (novoCommment: CommentDto): Comment => {
  const comment = new Comment;
  const usuario = new Usuario()
  comment.comentario = novoCommment.comentario
  novoCommment.comentarioId? comment.comment_id = novoCommment.comentarioId : comment.comment_id = null;
  usuario.id = novoCommment.usuarioId;
  comment.usuario = usuario;
  return comment;
};
