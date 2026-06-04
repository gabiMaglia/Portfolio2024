import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB } from '../../db/db.module';
import { DB as DBType, skills } from '@portfolio/db';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(@Inject(DB) private readonly db: DBType) {}

  findAll() { return this.db.select().from(skills); }

  async findOne(id: string) {
    const rows = await this.db.select().from(skills).where(eq(skills.id, id));
    if (!rows.length) throw new NotFoundException(`Skill ${id} not found`);
    return rows[0];
  }

  async create(dto: CreateSkillDto) {
    const rows = await this.db
      .insert(skills)
      .values({ ...dto, id: crypto.randomUUID() })
      .returning();
    return rows[0];
  }

  async update(id: string, dto: UpdateSkillDto) {
    const rows = await this.db.update(skills).set(dto).where(eq(skills.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Skill ${id} not found`);
    return rows[0];
  }

  async remove(id: string) {
    const rows = await this.db.delete(skills).where(eq(skills.id, id)).returning();
    if (!rows.length) throw new NotFoundException(`Skill ${id} not found`);
    return rows[0];
  }
}
