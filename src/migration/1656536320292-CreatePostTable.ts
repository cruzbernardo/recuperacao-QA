import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePostTable1656536320292 implements MigrationInterface {
    private readonly tableName = 'Posts';

    public async up(queryRunner: QueryRunner): Promise<void> {
      const postsTable = new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          { name: 'titulo', type: 'varchar' },
          { name: 'descricao', type: 'varchar' },
          { name: 'usuario_id', type: 'int' },
          { name: 'created_at', type: 'timestamp', default: 'now()'},
          { name: 'upadated_at', type: 'timestamp', default: 'now()'}
        ],
      });
  
      await queryRunner.createTable(postsTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
