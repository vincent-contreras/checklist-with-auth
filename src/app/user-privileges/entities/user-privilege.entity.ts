import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Resource } from "../../resources/entities/resource.entity";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";

@Entity()
export class UserPrivilege {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn({ type: "datetime", precision: 6 })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime", precision: 6 })
  @ApiProperty()
  updatedAt: Date;

  @Column({ nullable: false })
  @ApiProperty()
  resourceId!: number;

  @Column({ nullable: false })
  @ApiProperty()
  userId!: number;

  @Column({ type: "bool", nullable: false, default: false })
  @ApiProperty()
  canCreate: boolean;

  @Column({ type: "bool", nullable: false, default: false })
  @ApiProperty()
  canRead: boolean;

  @Column({ type: "bool", nullable: false, default: false })
  @ApiProperty()
  canUpdate: boolean;

  @Column({ type: "boolean" })
  @ApiProperty()
  canDelete: boolean;

  @ManyToOne(() => User, (user) => user.userToResource)
  public user!: User;

  @ManyToOne(() => Resource, (resource) => resource.userToResource, {
    eager: true
  })
  @ApiProperty()
  public resource!: Resource;
}
