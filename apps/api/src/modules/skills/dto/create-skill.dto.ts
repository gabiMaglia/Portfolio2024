import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSkillDto {
  @ApiPropertyOptional({ example: 'hard', description: '"hard" or "soft"' })
  @IsOptional() @IsString() type?: string;

  @ApiPropertyOptional({ example: 'https://example.com/react.svg' })
  @IsOptional() @IsString() img_skill?: string;

  @ApiPropertyOptional({ example: 'React' })
  @IsOptional() @IsString() name?: string;

  @ApiPropertyOptional({ example: 90, description: 'Skill level 0–100' })
  @IsOptional() @IsInt() @Min(0) amount?: number;
}
