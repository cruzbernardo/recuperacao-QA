import { Comment } from "../../models/CommentEntity";
import { AtualizarCommentDto, CommentDto, CriarCommentDto } from "../../@types/dto/CommentDto";

export interface ICommentService {
  buscarComentarios(comentarioId:number): Promise<Comment[]>
  criar(
    authorization: string, postDto: CriarCommentDto
  ): Promise<Comment>
  atualizar(authorization: string,
    id: number,
    commentDtoAtualizado: AtualizarCommentDto
  ): Promise<Comment | void > ;
  remover(authorization: string,id: number): Promise<void>;
}
