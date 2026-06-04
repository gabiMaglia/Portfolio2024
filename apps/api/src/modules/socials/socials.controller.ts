import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiSecurity, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SocialsService } from './socials.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@ApiTags('socials')
@Controller('socials')
export class SocialsController {
  constructor(private readonly service: SocialsService) {}

  @Get()
  @ApiOperation({ summary: 'List all social media links' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get one social link' })
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Create social link' })
  create(@Body() dto: CreateSocialDto) { return this.service.create(dto); }

  @Put(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Update social link' })
  update(@Param('id') id: string, @Body() dto: UpdateSocialDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Delete social link' })
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
