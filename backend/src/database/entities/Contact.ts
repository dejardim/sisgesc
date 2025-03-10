import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Guardian } from './Guardian';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: null,
    comment: 'Phone number of the contact'
  })
  phone: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
    comment: 'Indicates if the contact is active'
  })
  status: boolean;

  @ManyToOne(() => Guardian, (guardian) => guardian.contacts, { nullable: false })
  @JoinColumn({ name: 'guardian_id' })
  guardian: Guardian;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
