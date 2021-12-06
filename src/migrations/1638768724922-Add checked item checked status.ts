import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCheckedItemCheckedStatus1638768724922
  implements MigrationInterface
{
  name = 'AddCheckedItemCheckedStatus1638768724922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('checklist_item', [
      new TableColumn({
        name: 'checked',
        type: 'bool',
        isNullable: false,
        default: false
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userTable = await queryRunner.getTable('checklist_item');

    await queryRunner.dropColumn(userTable, 'checked');
  }
}
