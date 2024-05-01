import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Cat } from "src/cats/cat.entity";
import { Repository } from "typeorm";
import { FavoriteDto } from "./dto/favorite.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Cat) private catRepository: Repository<Cat>
  ) {}

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {id},
      relations: ['favorites']
    });

    if(!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findAll(id: number): Promise<Cat[]> {
    const user = await this.findOneById(id);
    return user.favorites;
  }

  async mark(id: number, params: FavoriteDto): Promise<User> {
    const user = await this.findOneById(id);
    const cats = await this.catRepository.findByIds(params.favoriteCatIds);

    if(!cats.length) {
      throw new Error('No cats found with the provided IDs');
    }

    user.favorites = cats;

    return this.userRepository.save(user);
  }
}