import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { UserPrivilegesService } from "./user-privileges.service";
import { CreateUserPrivilegeDto } from "./dto/create-user-privilege.dto";
import { UpdateUserPrivilegeDto } from "./dto/update-user-privilege.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("User Privileges")
@Controller({ version: "1", path: "user-privileges" })
export class UserPrivilegesController {
  constructor(private readonly userPrivilegesService: UserPrivilegesService) {}

  @Post()
  @ApiBody({ type: CreateUserPrivilegeDto, isArray: true })
  async create(@Body() createUserPrivilegeDtos: CreateUserPrivilegeDto[]) {
    const result = [];
    for (const createUserPrivilegeDto of createUserPrivilegeDtos) {
      result.push(
        await this.userPrivilegesService.create(createUserPrivilegeDto)
      );
    }
    return result;
  }

  @Get()
  findAll() {
    return this.userPrivilegesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userPrivilegesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserPrivilegeDto: UpdateUserPrivilegeDto
  ) {
    return this.userPrivilegesService.update(+id, updateUserPrivilegeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userPrivilegesService.remove(+id);
  }
}
