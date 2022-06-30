import { Comment } from "../../models/CommentEntity";

export interface ICommentRepository {
  save(Comment: Comment): Promise<Comment>;
  findById(id: number): Promise<Comment>;
  findCommentsCompleto(id: number): Promise<Comment[]>;
  remove(entities: Comment | Comment[]): Promise<Comment[]>;
}