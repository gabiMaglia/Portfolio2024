import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB } from '../../db/db.module';
import { DB as DBType, proyect, proyectEs } from '@portfolio/db';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@Inject(DB) private readonly db: DBType) {}

  private table(locale: 'es' | 'en') {
    return locale === 'es' ? proyectEs : proyect;
  }

  findAll(locale: 'es' | 'en' = 'en') {
    return this.db.select().from(this.table(locale));
  }

  async findOne(id: string, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.select().from(table).where(eq(table.id, id));
    if (!rows.length) throw new NotFoundException(`Project ${id} not found`);
    return rows[0];
  }

  async create(dto: CreateProjectDto, locale: 'es' | 'en' = 'en') {
    const rows = await this.db
      .insert(this.table(locale))
      .values({ ...dto, id: crypto.randomUUID() })
      .returning();
    return rows[0];
  }

  async update(id: string, dto: UpdateProjectDto, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.update(table).set(dto).where(eq(table.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Project ${id} not found`);
    return rows[0];
  }

  async remove(id: string, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.delete(table).where(eq(table.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Project ${id} not found`);
    return rows[0];
  }
}
