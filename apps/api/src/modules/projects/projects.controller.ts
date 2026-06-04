import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LocaleQueryDto } from '../../common/dto/locale-query.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  findAll(@Query() { locale }: LocaleQueryDto) {
    return this.service.findAll(locale);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one project by id' })
  findOne(@Param('id') id: string, @Query() { locale }: LocaleQueryDto) {
    return this.service.findOne(id, locale);
  }

  @Post()
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Create project' })
  create(@Body() dto: CreateProjectDto, @Query() { locale }: LocaleQueryDto) {
    return this.service.create(dto, locale);
  }

  @Put(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Update project' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto, @Query() { locale }: LocaleQueryDto) {
    return this.service.update(id, dto, locale);
  }

  @Delete(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Delete project' })
  remove(@Param('id') id: string, @Query() { locale }: LocaleQueryDto) {
    return this.service.remove(id, locale);
  }
}
