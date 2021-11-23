import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Resource } from '../../resources/entities/resource.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entity/user.entity';

@Entity()
export class UserPrivilege {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  resourceId!: number;

  @Column()
  @ApiProperty()
  userId!: number;

  @Column({ type: 'boolean' })
  @ApiProperty()
  canCreate: boolean;

  @Column({ type: 'boolean' })
  @ApiProperty()
  canRead: boolean;

  @Column({ type: 'boolean' })
  @ApiProperty()
  canUpdate: boolean;

  @Column({ type: 'boolean' })
  @ApiProperty()
  canDelete: boolean;

  @ManyToOne(() => User, (user) => user.userToResource)
  public user!: User;

  @ManyToOne(() => Resource, (resource) => resource.userToResource, {
    eager: true
  })
  @ApiProperty()
  public resource!: Resource;

  @CreateDateColumn({ type: 'datetime' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @ApiProperty()
  updatedAt: Date;
}
