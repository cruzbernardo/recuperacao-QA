import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1656534725061 implements MigrationInterface {
    private readonly tableName = 'Usuarios';

    public async up(queryRunner: QueryRunner): Promise<void> {
      const usuariosTable = new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          { name: 'nome', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'hashSenha', type: 'varchar' },
          { name: 'role', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()'},
          { name: 'upadated_at', type: 'timestamp', default: 'now()'}        ],
      });
  
      await queryRunner.createTable(usuariosTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
