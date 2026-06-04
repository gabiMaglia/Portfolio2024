import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiSecurity, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly service: SkillsService) {}

  @Get()
  @ApiOperation({ summary: 'List all skills' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get one skill' })
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Create skill' })
  create(@Body() dto: CreateSkillDto) { return this.service.create(dto); }

  @Put(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Update skill' })
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Delete skill' })
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
