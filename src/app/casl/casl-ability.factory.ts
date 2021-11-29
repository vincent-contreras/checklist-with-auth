import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  Subject
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Resource } from '../resources/entities/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from '../auth/enum/action.enum';
import { Role } from '../users/enums/role.enum';
import { UserPrivilege } from '../user-privileges/entities/user-privilege.entity';

export type AppAbility = Ability<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subject]>>(
      Ability as AbilityClass<AppAbility>
    );

    if (!user) {
      return build({
        // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
        detectSubjectType: (item) =>
          item.constructor as ExtractSubjectType<Subject>
      });
    }

    if (user.role == Role.Admin) {
      const allResources = await this.resourceRepository.find();

      for (const resource of allResources) {
        can(Action.CREATE, resource.name);
        can(Action.READ, resource.name);
        can(Action.UPDATE, resource.name);
        can(Action.DELETE, resource.name);
      }
    } else {
      const queriedUser: User = await this.userRepository.findOne({
        id: user.id
      });
      const userResourcePrivileges: UserPrivilege[] =
        queriedUser.userToResource;

      for (const privilege of userResourcePrivileges) {
        const theResource: Resource = privilege.resource;

        for (const privilegeMapping of [
          { action: Action.CREATE, mapper: privilege.canCreate },
          { action: Action.READ, mapper: privilege.canRead },
          { action: Action.UPDATE, mapper: privilege.canUpdate },
          { action: Action.DELETE, mapper: privilege.canDelete }
        ]) {
          const { action, mapper } = privilegeMapping;
          if (mapper === false) continue;
          can(action, theResource.name);
        }
      }
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>
    });
  }
}
