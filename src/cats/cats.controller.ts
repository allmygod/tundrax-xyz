import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Cat')
@UseGuards(RolesGuard)
@Controller('cats')
@UseGuards(JwtAuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(['admin'])
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({description: 'Create a cat profile'})
  async create(@Body() createCatDto: CatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({description: 'Get all cat profiles'})
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({description: 'Get cat profile'})
  async findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @Roles(['admin'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({description: 'Update cat profile'})
  async update(@Param('id') id: number, @Body() updateCatDto: CatDto): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({description: 'Delete cat profile'})
  async delete(@Param('id') id: number) {
    await this.catsService.delete(id);
  }
}