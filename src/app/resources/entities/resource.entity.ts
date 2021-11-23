import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserPrivilege } from '../../user-privileges/entities/user-privilege.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn({ type: 'datetime' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @ApiProperty()
  updatedAt: Date;

  @Column({ nullable: false, unique: true, comment: 'Name in source code' })
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  koreanName: string;

  @Column({ nullable: false, default: false })
  @ApiProperty()
  isCreatable: boolean;

  @Column({ nullable: false, default: false })
  @ApiProperty()
  isReadable: boolean;

  @Column({ nullable: false, default: false })
  @ApiProperty()
  isUpdatable: boolean;

  @Column({ nullable: false, default: false })
  @ApiProperty()
  isDeletable: boolean;

  @OneToMany(() => UserPrivilege, (userPrivilege) => userPrivilege.resource)
  @Exclude()
  userToResource!: UserPrivilege[];
}
