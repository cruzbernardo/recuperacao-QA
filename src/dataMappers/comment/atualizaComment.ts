import { AtualizarCommentDto } from "../../@types/dto/CommentDto";
import { Comment } from "../../models/CommentEntity";

export const atualizaComment = (
  comment: Comment,
  commentAlterado: AtualizarCommentDto
): Comment => {
  const commentAtualizado = { ...comment, ...commentAlterado};

  return commentAtualizado;
};
