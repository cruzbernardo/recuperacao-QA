import { BaseError } from "./BaseError";

export class PostNaoExiste extends Error implements BaseError {
  public name: string;
  constructor() {
    super("Post nao existe");
    this.name = "PostNaoExiste";
  }
}
