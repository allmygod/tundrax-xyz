import { Injectable } from '@nestjs/common';
import { Cat as CatInterface } from './interfaces/cat.interface';
import { Cat } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>){}

  async create(cat: CatInterface): Promise<Cat> {
    const newCat = this.catRepository.create(cat);
    await this.catRepository.save(newCat);
    return newCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    return this.catRepository.findOneBy({id});
  }

  async update(id: number, cat: CatInterface): Promise<Cat> {
    await this.catRepository.update(id, cat);
    return this.catRepository.findOneBy({id});
  }

  async delete(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}
