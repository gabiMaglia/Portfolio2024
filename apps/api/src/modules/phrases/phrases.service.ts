import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB } from '../../db/db.module';
import { DB as DBType, userPhrases, userPhrasesEs } from '@portfolio/db';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';

@Injectable()
export class PhrasesService {
  constructor(@Inject(DB) private readonly db: DBType) {}

  private table(locale: 'es' | 'en') {
    return locale === 'es' ? userPhrasesEs : userPhrases;
  }

  findAll(locale: 'es' | 'en' = 'en') {
    return this.db.select().from(this.table(locale));
  }

  async findOne(id: string, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.select().from(table).where(eq(table.id, id));
    if (!rows.length) throw new NotFoundException(`Phrase ${id} not found`);
    return rows[0];
  }

  async create(dto: CreatePhraseDto, locale: 'es' | 'en' = 'en') {
    const rows = await this.db
      .insert(this.table(locale))
      .values({ ...dto, id: crypto.randomUUID() })
      .returning();
    return rows[0];
  }

  async update(id: string, dto: UpdatePhraseDto, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.update(table).set(dto).where(eq(table.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Phrase ${id} not found`);
    return rows[0];
  }

  async remove(id: string, locale: 'es' | 'en' = 'en') {
    const table = this.table(locale);
    const rows = await this.db.delete(table).where(eq(table.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Phrase ${id} not found`);
    return rows[0];
  }
}
