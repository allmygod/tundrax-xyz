import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class FavoriteDto {
  @ApiProperty({
    name: 'favoriteCatIds',
    description: 'favorite cat IDs of the current user',
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  public readonly favoriteCatIds: number[];
}