import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserRolesAndAuthorization1637903854874
  implements MigrationInterface
{
  name = "AddUserRolesAndAuthorization1637903854874";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("user", [
      new TableColumn({
        name: "lastLoginAt",
        type: "datetime",
        precision: 6,
        isNullable: true
      }),
      new TableColumn({
        name: "activatedAt",
        type: "datetime",
        precision: 6,
        isNullable: true
      }),
      new TableColumn({
        name: "deactivatedAt",
        type: "datetime",
        precision: 6,
        isNullable: true
      }),
      new TableColumn({
        name: "role",
        enum: ["User", "Admin"],
        enumName: "userRoleEnum",
        isNullable: false,
        default: "'User'",
        type: "enum"
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userTable = await queryRunner.getTable("user");

    await queryRunner.dropColumn(userTable, "role");
    await queryRunner.dropColumn(userTable, "deactivatedAt");
    await queryRunner.dropColumn(userTable, "activatedAt");
    await queryRunner.dropColumn(userTable, "lastLoginAt");
  }
}
