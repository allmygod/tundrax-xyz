import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "src/users/user.entity";
import { FavoriteDto } from "./dto/favorite.dto";
import { Cat } from "src/cats/cat.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('favorites')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({description: 'Get favorite cats'})
  async findAll(@Req() req: any): Promise<Cat[]> {
    return this.usersService.findAll(req.user.id);
  }

  @Post('favorites')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({description: 'Mark cats as favorites'})
  async mark(@Body() params: FavoriteDto, @Req() req: any): Promise<User> {
    return this.usersService.mark(req.user.id, params);
  }
}