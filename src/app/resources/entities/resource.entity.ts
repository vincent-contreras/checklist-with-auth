import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { UserPrivilege } from "../../user-privileges/entities/user-privilege.entity";

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn({ type: "datetime" })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  @ApiProperty()
  updatedAt: Date;

  @Column({
    nullable: false,
    unique: true,
    comment: "Name in source code",
    length: 255
  })
  @ApiProperty()
  name: string;

  @Column({ nullable: true, length: 255 })
  @ApiProperty()
  koreanName: string;

  @Column({ type: "bool", nullable: false, default: false })
  @ApiProperty()
  creatable: boolean;

  @Column({ type: "bool", nullable: false, default: false })
  @ApiProperty()
  readable: boolean;

  @Column({ type: "bool", nullable: false, default: false })
  @ApiProperty()
  updatable: boolean;

  @Column({ type: "bool", nullable: false, default: false })
  @ApiProperty()
  deletable: boolean;

  @OneToMany(() => UserPrivilege, (userPrivilege) => userPrivilege.resource)
  @Exclude()
  userToResource!: UserPrivilege[];
}
