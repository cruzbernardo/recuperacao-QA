import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./PostEntity";
import { Usuario } from "./UsuarioEntity";


@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @Column({nullable:true})
  comment_id: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => Usuario, (usuario) => usuario.comments)
  usuario: Usuario

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
