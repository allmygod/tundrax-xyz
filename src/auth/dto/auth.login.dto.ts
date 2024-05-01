import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthLoginDto {
  @ApiProperty({
    name: 'email',
    description: 'Email for user'   
  })
  @IsNotEmpty()
  public readonly email: string

  @ApiProperty({
    name: 'password',
    description: 'Password for user'
  })
  @IsNotEmpty()
  public readonly password: string
}