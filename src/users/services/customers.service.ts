import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  private counterId = 1;
  /*private customers: Customer[] = [
    {
      id: 1,
      name: 'Nicolas',
      lastName: 'Molina',
      phone: '3111111212',
    },
  ];*/

  findAll() {
    // return this.customers;
    return this.customerRepo.find(); 
  }

  async findOne(id: number) {
    /*const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;*/
    const customer = await this.customerRepo.findOne(id); // Método integrado en TypeORM
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    /*this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...data,
    };
    this.customers.push(newCustomer);
    return newCustomer;*/
    const newCustomer = this.customerRepo.create(data); // TypeORM, para crear un nuevo registro
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    /*const customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...customer,
      ...changes,
    };
    return this.customers[index];*/
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, changes); // Sobreescribir la info que coincida
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    /*const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;*/
    return this.customerRepo.delete(id);
    //return null;
  }
}
