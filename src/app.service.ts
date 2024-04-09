import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('PG') private clientePG: Client,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    //onst apiKey = this.configService.apiKey;
    //onst name = this.configService.database.name;
    return 'Hello World!';
  }
  getTasks(){
    // Todo se maneja como promesas, tiene que haber un retorno hacia el Controller
    return new Promise((resolve, reject) => {
       this.clientePG.query('SELECT * FROM customer ORDER BY id ASC', (err, res) => {
        if(err){
            reject(err);
        }
        resolve(res.rows);
      });
    });
  }

}
