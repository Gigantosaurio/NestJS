import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Customer } from './customer.entity';
import { OneToMany } from 'typeorm';
import { Favorito } from 'src/peliculas/entities/favorito.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // encript

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true }) // indicaciones de unión, usuarios que no son clientes
  @JoinColumn() // referencia real
  customer: Customer;

  @OneToMany(() => Favorito, (favorito) => favorito.user)
  favoritos: Favorito[];
}
