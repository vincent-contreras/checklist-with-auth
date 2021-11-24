import { Injectable } from "@nestjs/common";
import { CreateUserPrivilegeDto } from "./dto/create-user-privilege.dto";
import { UpdateUserPrivilegeDto } from "./dto/update-user-privilege.dto";

@Injectable()
export class UserPrivilegesService {
  create(createUserPrivilegeDto: CreateUserPrivilegeDto) {
    return "This action adds a new userPrivilege";
  }

  findAll() {
    return `This action returns all userPrivileges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPrivilege`;
  }

  update(id: number, updateUserPrivilegeDto: UpdateUserPrivilegeDto) {
    return `This action updates a #${id} userPrivilege`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPrivilege`;
  }
}
