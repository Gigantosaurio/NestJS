import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from '../entities/pelicula.entity';

@Injectable()
export class PeliculasService {
    //Como inserto mi repository para que me gfestione las tarnsacciones
    //con base de datos de forma automática => TYPE ORM

    constructor(
        @InjectRepository(Pelicula)
        private peliculasRepository: Repository<Pelicula>,
    ){}

    async findAll(): Promise < Pelicula[] > {
        console.log('Llegando A LISTAR TODOS');
        return this.peliculasRepository.find(); // Utiliza el método find() sin argumentos para obtener todas las entidades
    }


    // Nuevo método para filtrar películas por categoría
    async findByCategoria(categoriaId: number): Promise<Pelicula[]> {
      return this.peliculasRepository
        .createQueryBuilder('pelicula')
        .innerJoinAndSelect('pelicula.categorias', 'categoria')
        .where('categoria.id = :categoriaId', { categoriaId })
        .getMany();
    }

    
}
