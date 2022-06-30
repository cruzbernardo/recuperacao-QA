export type CommentDto = {
    id?: number;
    comentario: string;
    postId: number;
    usuarioId: number;
    comentarioId?:number;
  };
  
  export type AtualizarCommentDto = {
    comentario?: string;
  };
  
  export type CriarCommentDto = Omit<CommentDto, "id">;