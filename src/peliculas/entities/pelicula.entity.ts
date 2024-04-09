import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from 'typeorm';
  import { Categoria } from './categoria.entity';
  import { Favorito } from './favorito.entity';
  
  
  @Entity('peliculas')
  export class Pelicula {
    @PrimaryGeneratedColumn()
    id: number;
  
  
    @Column({ length: 255 })
    titulo: string;
  
  
    @Column('text', { nullable: true })
    descripcion: string;
  
  
    @Column()
    fecha_lanzamiento: Date;
  
  
    @Column({ nullable: true })
    imagen: string;
  
  
    @Column()
    creado_en: Date;
  
  
    @ManyToMany(() => Categoria)
    @JoinTable({
      name: 'peliculas_categorias',
      joinColumn: { name: 'pelicula_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'categoria_id', referencedColumnName: 'id' },
    })
    categorias: Categoria[];
  
  
    @OneToMany(() => Favorito, (favorito) => favorito.pelicula)
    favoritos: Favorito[];
  }
  