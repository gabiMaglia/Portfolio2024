import {
  Body, Controller, Delete, Get, Param, Post, Put, Query,
} from '@nestjs/common';
import { ApiSecurity, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { LocaleQueryDto } from '../../common/dto/locale-query.dto';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly service: ExperiencesService) {}

  @Get()
  @ApiOperation({ summary: 'List all experiences' })
  findAll(@Query() { locale }: LocaleQueryDto) {
    return this.service.findAll(locale);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one experience by id' })
  findOne(@Param('id') id: string, @Query() { locale }: LocaleQueryDto) {
    return this.service.findOne(id, locale);
  }

  @Post()
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Create experience' })
  create(@Body() dto: CreateExperienceDto, @Query() { locale }: LocaleQueryDto) {
    return this.service.create(dto, locale);
  }

  @Put(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Update experience' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateExperienceDto,
    @Query() { locale }: LocaleQueryDto,
  ) {
    return this.service.update(id, dto, locale);
  }

  @Delete(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Delete experience' })
  remove(@Param('id') id: string, @Query() { locale }: LocaleQueryDto) {
    return this.service.remove(id, locale);
  }
}
