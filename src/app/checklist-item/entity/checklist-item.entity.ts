import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChecklistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  item: string;
}
