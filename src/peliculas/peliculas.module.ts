import { Module } from '@nestjs/common';
import { PeliculasController } from './controllers/peliculas.controller';
import { PeliculasService } from './services/peliculas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Favorito } from './entities/favorito.entity';
import { Pelicula } from './entities/pelicula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula, Categoria, Favorito])],
  controllers: [PeliculasController],
  providers: [PeliculasService],
})
export class PeliculasModule {}
