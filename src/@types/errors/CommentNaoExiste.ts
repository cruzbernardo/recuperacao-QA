import { BaseError } from "./BaseError";

export class CommentNaoExiste extends Error implements BaseError {
  public name: string;
  constructor() {
    super("Comentario nao existe");
    this.name = "CommentNaoExiste";
  }
}
