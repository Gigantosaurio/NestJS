import { Controller, Get, Param } from '@nestjs/common';
import { Pelicula } from '../entities/pelicula.entity';
import { PeliculasService } from '../services/peliculas.service';

@Controller('peliculas')
export class PeliculasController {
    constructor(private readonly peliculasService: PeliculasService) { }


    @Get()
    findAll(): Promise<Pelicula[]> {
        return this.peliculasService.findAll();
    }

    @Get('categoria/:categoriaId')
    findByCategoria(
      @Param('categoriaId') categoriaId: number,
    ): Promise<Pelicula[]> {
      return this.peliculasService.findByCategoria(categoriaId);
    }


}