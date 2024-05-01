import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dto/auth.register.dto";
import { AuthTokenDto } from "./dto/auth.token.dto";
import { AuthLoginDto } from "./dto/auth.login.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Signup endpoint for authentication' })
  public async register(@Body() params: AuthRegisterDto): Promise<AuthTokenDto> {
    try {
      const user = await this.authService.register(params);
      return this.authService.login(user)
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Email @ Password Login endpoint for authentication' })
  @ApiOkResponse({ description: 'Return JWT token' })
  @ApiUnauthorizedResponse({ description: 'Cannot authorize with given email and password' })
  async login(@Body() params: AuthLoginDto, @Request() req: any): Promise<AuthTokenDto> {
    return await this.authService.login(req.user);
  }
}