import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserPrivilege } from '../../user-privileges/entities/user-privilege.entity';
import { Role } from '../enums/role.enum';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({ nullable: false })
  fullName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastLoginAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  activatedAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  deactivatedAt: Date;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false
  })
  role: Role;

  @ApiProperty({ type: 'boolean' })
  @Expose()
  get isActive() {
    return (
      (!!this.activatedAt && !this.deactivatedAt) ||
      this.activatedAt > this.deactivatedAt
    );
  }

  @OneToMany(() => UserPrivilege, (userPrivilege) => userPrivilege.user, {
    eager: true
  })
  @Exclude()
  userToResource: UserPrivilege[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
