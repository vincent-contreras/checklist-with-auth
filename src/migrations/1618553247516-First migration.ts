import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FirstMigration1618553247516 implements MigrationInterface {
  name = 'FirstMigration1618553247516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'checklist_item',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'item',
            type: 'varchar',
            length: '255',
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('checklist_item');
  }
}
