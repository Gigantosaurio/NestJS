import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('favoritos')
export class Favorito {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  usuario_id: number;


  @Column()
  pelicula_id: number;


  @Column()
  creado_en: Date;


  @ManyToOne(() => User, (user) => user.favoritos)
  @JoinColumn({ name: 'usuario_id' })
  user: User;


  @ManyToOne(() => Pelicula, (pelicula) => pelicula.favoritos)
  @JoinColumn({ name: 'pelicula_id' })
  pelicula: Pelicula;
}
