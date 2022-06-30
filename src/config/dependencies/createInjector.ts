import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/UsuarioController";


// inicializa services
import "../../services/UsuarioService";


// inicializa clientes
import "../../infra/http/AxiosHttpClient";


const createDependencyInjector = (): void => {
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
};

export default createDependencyInjector;
