import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./CommentEntity";
import { Usuario } from "./UsuarioEntity";



@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  titulo: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.posts)
  usuario: Usuario

  @OneToMany(()=> Comment, (comment)=> comment.post )
  comments: Comment[]

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
