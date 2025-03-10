import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
    comment: 'Name of the role (must be unique)'
  })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
