import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { UserPrivilege } from "../../user-privileges/entities/user-privilege.entity";

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
