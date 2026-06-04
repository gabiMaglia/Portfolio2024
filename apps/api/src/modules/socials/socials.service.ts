import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB } from '../../db/db.module';
import { DB as DBType, social } from '@portfolio/db';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@Injectable()
export class SocialsService {
  constructor(@Inject(DB) private readonly db: DBType) {}

  findAll() { return this.db.select().from(social); }

  async findOne(id: string) {
    const rows = await this.db.select().from(social).where(eq(social.id, id));
    if (!rows.length) throw new NotFoundException(`Social ${id} not found`);
    return rows[0];
  }

  async create(dto: CreateSocialDto) {
    const rows = await this.db
      .insert(social)
      .values({ ...dto, id: crypto.randomUUID() })
      .returning();
    return rows[0];
  }

  async update(id: string, dto: UpdateSocialDto) {
    const rows = await this.db.update(social).set(dto).where(eq(social.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Social ${id} not found`);
    return rows[0];
  }

  async remove(id: string) {
    const rows = await this.db.delete(social).where(eq(social.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Social ${id} not found`);
    return rows[0];
  }
}
