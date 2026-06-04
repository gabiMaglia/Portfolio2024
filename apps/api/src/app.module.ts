import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DbModule } from './db/db.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsModule } from './modules/skills/skills.module';
import { SocialsModule } from './modules/socials/socials.module';
import { PhrasesModule } from './modules/phrases/phrases.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    ExperiencesModule,
    ProjectsModule,
    SkillsModule,
    SocialsModule,
    PhrasesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
