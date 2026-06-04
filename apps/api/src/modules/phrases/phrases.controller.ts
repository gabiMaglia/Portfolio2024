import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PhrasesService } from './phrases.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { LocaleQueryDto } from '../../common/dto/locale-query.dto';

@ApiTags('phrases')
@Controller('phrases')
export class PhrasesController {
  constructor(private readonly service: PhrasesService) {}

  @Get()
  @ApiOperation({ summary: 'List all phrases (bio text)' })
  findAll(@Query() { locale }: LocaleQueryDto) {
    return this.service.findAll(locale);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one phrase row' })
  findOne(@Param('id') id: string, @Query() { locale }: LocaleQueryDto) {
    return this.service.findOne(id, locale);
  }

  @Post()
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Create phrase row' })
  create(@Body() dto: CreatePhraseDto, @Query() { locale }: LocaleQueryDto) {
    return this.service.create(dto, locale);
  }

  @Put(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Update phrase row' })
  update(@Param('id') id: string, @Body() dto: UpdatePhraseDto, @Query() { locale }: LocaleQueryDto) {
    return this.service.update(id, dto, locale);
  }

  @Delete(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Delete phrase row' })
  remove(@Param('id') id: string, @Query() { locale }: LocaleQueryDto) {
    return this.service.remove(id, locale);
  }
}
