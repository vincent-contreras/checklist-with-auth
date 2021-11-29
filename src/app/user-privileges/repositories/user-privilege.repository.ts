import { EntityRepository, Repository } from 'typeorm';
import { UserPrivilege } from '../entities/user-privilege.entity';

@EntityRepository(UserPrivilege)
export class UserPrivilegeRepository extends Repository<UserPrivilege> {}
