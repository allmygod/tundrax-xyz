import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsString } from "class-validator";

export class AuthTokenDto {
  @ApiProperty({
    name: 'token',
    description: 'The JWT token of the API user',
  })
  @IsString()
  @IsJWT()
  public readonly token: string

  @ApiProperty({
    name: 'uid',
    description: 'User ID of the logged in user',
  })
  @IsString()
  public readonly uid: string
}