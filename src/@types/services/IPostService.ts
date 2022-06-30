import { AtualizarPostDto, CriarPostDto, PostDto } from "../dto/PostDto";
import { Post } from "models/PostEntity";


export interface IPostService {
  listar(): Promise<Post[]>;
  buscar(id: number): Promise<Post>;
  criar(
    authorization: string, postDto: CriarPostDto
  ): Promise<Post>
  atualizar(authorization: string,
    id: number,
    postDtoAtualizado: AtualizarPostDto
  ): Promise<Post | void > ;
  remover(authorization: string,id: number): Promise<void> 
  buscarPostsPorAutor(authorization:string): Promise<Post[]>;
  buscarPostsPorTitulo(titulo:string):Promise<Post[]>
}
