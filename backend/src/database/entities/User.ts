import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './Role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Full name of the user'
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    comment: 'Unique email address of the user'
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    select: false,
    comment: 'Password hash of the user'
  })
  password: string | null;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
