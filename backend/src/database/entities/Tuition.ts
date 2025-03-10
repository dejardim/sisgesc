import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity('tuitions')
export class Tuition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 22,
    nullable: false,
    unique: true,
    comment: 'Unique code for the tuition payment'
  })
  code: string;

  @Column({
    type: 'date',
    nullable: false,
    comment: 'Due date for the tuition payment'
  })
  due_date: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: 'Amount to be paid (stored as string for precise decimal handling)'
  })
  amount: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Indicates if this is an enrollment fee'
  })
  is_enrollment: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Indicates if the tuition has been paid'
  })
  is_paid: boolean;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Date when the payment was mark as paid'
  })
  paid_at: Date;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.tuitions, { nullable: false })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
