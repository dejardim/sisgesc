import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Full name of the student'
  })
  name: string;

  @Column({
    type: 'date',
    nullable: false,
    comment: 'Birthday of the student'
  })
  birthday: string;

  @Column({
    type: 'varchar',
    length: 1,
    nullable: false,
    comment: 'Gender of the student (Male or Female)'
  })
  gender: string;

  @OneToOne(() => Enrollment, (enrollment) => enrollment.student)
  enrollment: Enrollment;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
