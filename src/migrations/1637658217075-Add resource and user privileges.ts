import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class AddResourceAndUserPrivileges1637658217075
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'resource',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'createdAt',
            type: 'datetime',
            precision: 6,
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)'
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            precision: 6,
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
            comment: 'Name in source code'
          },
          {
            name: 'koreanName',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'creatable',
            type: 'bool',
            isNullable: false,
            default: false
          },
          {
            name: 'readable',
            type: 'bool',
            isNullable: false,
            default: false
          },
          {
            name: 'updatable',
            type: 'bool',
            isNullable: false,
            default: false
          },
          {
            name: 'deletable',
            type: 'bool',
            isNullable: false,
            default: false
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_privilege',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'createdAt',
            type: 'datetime',
            precision: 6,
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)'
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            precision: 6,
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)'
          },
          {
            name: 'resourceId',
            type: 'int',
            isNullable: false
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false
          },
          {
            name: 'canCreate',
            type: 'bool',
            isNullable: false
          },
          {
            name: 'canRead',
            type: 'bool',
            isNullable: false
          },
          {
            name: 'canUpdate',
            type: 'bool',
            isNullable: false
          },
          {
            name: 'canDelete',
            type: 'bool',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'user_privilege',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'NO ACTION'
      })
    );

    await queryRunner.createForeignKey(
      'user_privilege',
      new TableForeignKey({
        columnNames: ['resourceId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'resource',
        onDelete: 'NO ACTION'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_privilege');
    await queryRunner.dropTable('resource');
  }
}
