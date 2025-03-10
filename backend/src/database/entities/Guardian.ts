import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { Contact } from './Contact';
import { Enrollment } from './Enrollment';

@Entity('guardians')
export class Guardian {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Full name of the guardian'
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
    comment: 'CPF of the guardian (unique)'
  })
  cpf: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
    comment: 'Email address of the guardian (unique)'
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Address of the guardian'
  })
  address: string;

  @OneToMany(() => Contact, (contact) => contact.guardian)
  contacts: Contact[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.guardian)
  enrollments: Enrollment[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
