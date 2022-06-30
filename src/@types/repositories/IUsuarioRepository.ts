import { Usuario } from "../../models/UsuarioEntity";


export interface IUsuarioRepository {
  find(): Promise<Usuario[]>;
  findOne(id: number): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
  findByEmail(usuarioEmail: string): Promise<Usuario>;
  findAdmins(): Promise<Usuario[]>;
  remove(entities: Usuario | Usuario[]): Promise<Usuario[]>;
}
