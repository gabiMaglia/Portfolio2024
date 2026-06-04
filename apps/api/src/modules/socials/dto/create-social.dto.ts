import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSocialDto {
  @ApiPropertyOptional({ example: 'GitHub' })
  @IsOptional() @IsString() name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/github-icon.svg' })
  @IsOptional() @IsString() img?: string;

  @ApiPropertyOptional({ example: 'https://github.com/gabiMaglia' })
  @IsOptional() @IsString() url?: string;
}
