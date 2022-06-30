export type PostDto = {
  id?: number;
  titulo: string;
  descricao: string;
  usuarioId?: number;
};

export type AtualizarPostDto = {
  titulo?: string;
  descricao?: string;
};

export type CriarPostDto = Omit<PostDto, "id">;