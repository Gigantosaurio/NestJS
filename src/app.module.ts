import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';
import { Client } from 'pg';
import { PeliculasModule } from './peliculas/peliculas.module';

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const client = new Client({
  user: 'postgres',
  host: 'postgreaws.cgva1slg3i1p.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'LucasLucas',
  port: 5432,
  ssl: true, 
});
client.connect();
client.query('SELECT * FROM task ORDER BY id ASC', (err, res) => {
  console.error(err);
  console.log(res.rows);
});


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    PeliculasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
