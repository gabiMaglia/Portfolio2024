import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @ApiPropertyOptional({ example: 'Fullstack Developer', description: 'Job title' })
  @IsOptional()
  @IsString()
  title_exp?: string;

  @ApiPropertyOptional({ example: 'Acme Corp', description: 'Company or institution name' })
  @IsOptional()
  @IsString()
  institution_exp?: string;

  @ApiPropertyOptional({ example: 'Jan 2023', description: 'Start date (any text format)' })
  @IsOptional()
  @IsString()
  startDate_exp?: string;

  @ApiPropertyOptional({ example: 'Dec 2024', description: 'End date or "Present"' })
  @IsOptional()
  @IsString()
  endDate_exp?: string;

  @ApiPropertyOptional({ example: 'Built the main product UI with React and Node.' })
  @IsOptional()
  @IsString()
  description_exp?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png', description: 'Company logo URL' })
  @IsOptional()
  @IsString()
  img_exp?: string;
}
