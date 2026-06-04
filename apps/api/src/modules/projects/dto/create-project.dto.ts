import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiPropertyOptional({ example: 'Portfolio 2025' })
  @IsOptional() @IsString() title_pro?: string;

  @ApiPropertyOptional({ example: 'React · Next.js · PostgreSQL' })
  @IsOptional() @IsString() technologies_pro?: string;

  @ApiPropertyOptional({ example: 'A personal portfolio site built with Next.js.' })
  @IsOptional() @IsString() description_pro?: string;

  @ApiPropertyOptional({ example: 'https://myportfolio.dev' })
  @IsOptional() @IsString() deployLink_pro?: string;

  @ApiPropertyOptional({ example: 'https://github.com/user/repo' })
  @IsOptional() @IsString() githubLink_pro?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/img1.png' })
  @IsOptional() @IsString() img1_pro?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/img2.png' })
  @IsOptional() @IsString() img2_pro?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/img3.png' })
  @IsOptional() @IsString() img3_pro?: string;
}
