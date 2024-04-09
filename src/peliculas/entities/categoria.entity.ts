import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Pelicula } from './pelicula.entity';


@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ length: 255, unique: true })
  nombre: string;


  @Column('text', { nullable: true })
  descripcion: string;


  @Column()
  creado_en: Date;


  @ManyToMany(() => Pelicula, (pelicula) => pelicula.categorias)
  peliculas: Pelicula[];
}
