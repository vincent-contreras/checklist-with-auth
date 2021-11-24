import { PartialType } from "@nestjs/swagger";
import { CreateUserPrivilegeDto } from "./create-user-privilege.dto";

export class UpdateUserPrivilegeDto extends PartialType(
  CreateUserPrivilegeDto
) {}
