import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePhraseDto {
  @ApiPropertyOptional({ example: 'Soy Gabriel, desarrollador fullstack con foco en frontend.' })
  @IsOptional() @IsString() main_phrase?: string;

  @ApiPropertyOptional({ example: 'Trabajo de punta a punta.' })
  @IsOptional() @IsString() phrase1?: string;

  @ApiPropertyOptional({ example: 'Me obsesiona el detalle.' })
  @IsOptional() @IsString() phrase2?: string;

  @ApiPropertyOptional({ example: 'Construyo para producción.' })
  @IsOptional() @IsString() phrase3?: string;
}
