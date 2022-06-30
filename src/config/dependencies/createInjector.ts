import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { PostRepository } from "../../repositories/PostRepository";
import { CommentRepository } from "../../repositories/CommentRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/UsuarioController";
import "../../controllers/PostController";
import "../../controllers/CommentController";


// inicializa services
import "../../services/UsuarioService";
import "../../services/PostService";
import "../../services/CommentService";


// inicializa clientes
import "../../infra/http/AxiosHttpClient";


const createDependencyInjector = (): void => {
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
  Container.set("PostRepository", getCustomRepository(PostRepository));
  Container.set("CommentRepository", getCustomRepository(CommentRepository));
};

export default createDependencyInjector;
