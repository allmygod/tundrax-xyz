import { Cat as CatInterface } from './interfaces/cat.interface';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';
export declare class CatsService {
    private catRepository;
    constructor(catRepository: Repository<Cat>);
    create(cat: CatInterface): Promise<Cat>;
    findAll(): Promise<Cat[]>;
    findOne(id: number): Promise<Cat>;
    update(id: number, cat: CatInterface): Promise<Cat>;
    delete(id: number): Promise<void>;
}
