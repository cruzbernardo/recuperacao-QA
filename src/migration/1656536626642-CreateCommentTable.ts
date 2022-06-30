import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCommentTable1656536626642 implements MigrationInterface {
    private readonly tableName = 'Comments';

    public async up(queryRunner: QueryRunner): Promise<void> {
      const commentsTable = new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          { name: 'comentario', type: 'varchar' },
          { name: 'post_id', type: 'int' },
          { name: 'usuario_id', type: 'int' },
          { name: 'comment_id', type: 'int' },
          { name: 'created_at', type: 'timestamp', default: 'now()'},
          { name: 'upadated_at', type: 'timestamp', default: 'now()'}
        ],
      });
  
      await queryRunner.createTable(commentsTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
