import { ICommentRepository } from "../@types/repositories/ICommentRepository";
import { Comment } from "../models/CommentEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Comment)
export class CommentRepository
  extends Repository<Comment>
  implements ICommentRepository
{
  findById(CommentId: number): Promise<Comment> {
    return this.findOne({
      where: {
        id: CommentId
      },
    });
  }

  findCommentsCompleto(CommentId: number): Promise<Comment[]> {
    return this.find({
      where: {
        commentId: CommentId,
      },
    });
  }
}
