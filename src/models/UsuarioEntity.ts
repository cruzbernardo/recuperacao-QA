import { Role } from "../@types/enums/Role";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./PostEntity";
import { Comment } from "./CommentEntity";


@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashSenha: string;

  @Column({ type: "enum", enum: Role, default: Role.User })
  role: Role;

  @OneToMany(() => Post, (post) => post.usuario)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.usuario)
  comments: Comment[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
