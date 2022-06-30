import { AtualizarPostDto } from "../../@types/dto/PostDto";
import { Post } from "../../models/PostEntity";

export const atualizaPost = (
  Post: Post,
  PostAlterado: AtualizarPostDto
): Post => {
  const PostAtualizado = { ...Post, ...PostAlterado};

  return PostAtualizado;
};
