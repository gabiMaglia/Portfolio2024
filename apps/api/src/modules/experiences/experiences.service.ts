import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB } from '../../db/db.module';
import { DB as DBType } from '@portfolio/db';
import { experience, experienceEs } from '@portfolio/db';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(@Inject(DB) private readonly db: DBType) {}

  private table(locale: 'es' | 'en') {
    return locale === 'es' ? experienceEs : experience;
  }

  findAll(locale: 'es' | 'en' = 'en') {
    return this.db.select().from(this.table(locale));
  }

  async findOne(id: string, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.select().from(table).where(eq(table.id, id));
    if (!rows.length) throw new NotFoundException(`Experience ${id} not found`);
    return rows[0];
  }

  async create(dto: CreateExperienceDto, locale: 'es' | 'en' = 'en') {
    const rows = await this.db
      .insert(this.table(locale))
      .values({ ...dto, id: crypto.randomUUID() })
      .returning();
    return rows[0];
  }

  async update(id: string, dto: UpdateExperienceDto, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.update(table).set(dto).where(eq(table.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Experience ${id} not found`);
    return rows[0];
  }

  async remove(id: string, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.delete(table).where(eq(table.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Experience ${id} not found`);
    return rows[0];
  }
}
