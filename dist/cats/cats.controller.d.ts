import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    create(createCatDto: CatDto): Promise<Cat>;
    findAll(): Promise<Cat[]>;
    findOne(id: number): Promise<Cat>;
    update(id: number, updateCatDto: CatDto): Promise<Cat>;
    delete(id: number): Promise<void>;
}
