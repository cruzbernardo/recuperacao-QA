import { ICommentRepository } from "../@types/repositories/ICommentRepository";
import { ICommentService } from "../@types/services/ICommentService";
import { Inject, Service } from "typedi";

import {
  AtualizarCommentDto,
  CriarCommentDto,
} from "../@types/dto/CommentDto";
import { commentFactory } from "../dataMappers/comment/commentFactory";
import { CommentNaoExiste } from "../@types/errors/CommentNaoExiste";
import { atualizaComment } from "../dataMappers/comment/atualizaComment";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { decode } from "jsonwebtoken";
import { Comment } from "../models/CommentEntity";

@Service("CommentService")
export class CommentService implements ICommentService {
  constructor(
    @Inject("CommentRepository")
    private commentRepository: ICommentRepository,
  ) {}
  async buscarComentarios(comentarioId:number): Promise<Comment[]> {
    const Comments = await this.commentRepository.findCommentsCompleto(comentarioId);
    const CommentsTratados = Comments.sort(function(a,b){
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    return CommentsTratados;
  }
  async criar(
    authorization: string, commentDto: CriarCommentDto
  ): Promise<Comment> {
      const usuario = decode(authorization) as TokenPayload;
      commentDto.usuarioId = usuario.id;
      const novoComment = commentFactory(commentDto);
      return await this.commentRepository.save(
        novoComment
      );
  }
  async atualizar(authorization: string,
    id: number,
    commentDtoAtualizado: AtualizarCommentDto
  ): Promise<Comment | void > {
    const usuario = decode(authorization) as TokenPayload;
    const comment = await this.checaComment(id);
    if(comment.usuario.id === usuario.id){
        const commentAtualizado = atualizaComment(
        comment,
        commentDtoAtualizado
      );
      return await this.commentRepository.save(commentAtualizado);
    }
    
  }
  async remover(authorization: string,id: number): Promise<void>  {
    const commentPraRemover = await this.checaComment(id);
    const usuario = decode(authorization) as TokenPayload;
    if(usuario.id === commentPraRemover.usuario.id){
      await this.commentRepository.remove(commentPraRemover);
    }
    return;
  }
  
  private async checaComment(id: number): Promise<Comment> {
    const Post = await this.commentRepository.findById(id);
    if (!Post) {
      throw new CommentNaoExiste();
    }
    return Post;
  }
}
