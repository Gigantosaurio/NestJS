import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientePG: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  private counterId = 1;
  /*private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];*/

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    //return this.users;
    return this.userRepo.find();// Listar todos, find()
  }

  async findOne(id: number) {
    const user = this.userRepo.findOne(id); // Método integrado en TypeORM
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    /*this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;*/
    const newUser = this.userRepo.create(data); // TypeORM, para crear un nuevo registro
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
   /* const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];*/
    const user = await this.findOne(id);
    this.userRepo.merge(user, changes); // Sobreescribir la info que coincida
    return this.userRepo.save(user);
  }

  remove(id: number) {
   /* const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;*/
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number): Promise<Order> {
    const user = await this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks(){
    // Todo se maneja como promesas, tiene que haber un retorno hacia el Controller
    return new Promise((resolve, reject) => {
       this.clientePG.query('SELECT * FROM customer ORDER BY id ASC', (err, res) => {
        if(err){
            reject(err);
        }
        resolve(res);
      });
    });
  }
}
