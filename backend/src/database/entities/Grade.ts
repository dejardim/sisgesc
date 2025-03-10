import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
    comment: 'Name of the grade (must be unique)'
  })
  name: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.grade)
  enrollments: Enrollment[];
}
