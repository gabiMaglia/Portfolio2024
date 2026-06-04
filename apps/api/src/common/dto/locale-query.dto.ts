import { IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LocaleQueryDto {
  @ApiPropertyOptional({
    enum: ['es', 'en'],
    default: 'en',
    description: 'Content language. Resolves to corresponding DB table.',
  })
  @IsOptional()
  @IsIn(['es', 'en'])
  locale?: 'es' | 'en' = 'en';
}
