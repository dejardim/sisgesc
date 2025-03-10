import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, DeleteDateColumn } from 'typeorm';
import { Student } from './Student';
import { Guardian } from './Guardian';
import { Grade } from './Grade';
import { Shift } from './Shift';
import { Tuition } from './Tuition';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'Indicates if the enrollment is active'
  })
  status: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    comment: 'Indicates if the enrollment includes daycare'
  })
  is_daycare: boolean;

  @OneToOne(() => Student, (student) => student.enrollment, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Guardian, (guardian) => guardian.enrollments, { nullable: false })
  @JoinColumn({ name: 'guardian_id' })
  guardian: Guardian;

  @ManyToOne(() => Grade, (grade) => grade.enrollments, { nullable: false })
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;

  @ManyToOne(() => Shift, (shift) => shift.enrollments, { nullable: false })
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @OneToMany(() => Tuition, (tuition) => tuition.enrollment)
  tuitions: Tuition[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
