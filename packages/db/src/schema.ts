import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// ── Experiences ──────────────────────────────────────────────────────────────

export const experience = pgTable('Experiences', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_exp: text('title_exp'),
  institution_exp: text('institution_exp'),
  startDate_exp: text('startDate_exp'),
  endDate_exp: text('endDate_exp'),
  description_exp: text('description_exp'),
  img_exp: text('img_exp'),
});

export const experienceEs = pgTable('Experiences_es', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_exp: text('title_exp'),
  institution_exp: text('institution_exp'),
  startDate_exp: text('startDate_exp'),
  endDate_exp: text('endDate_exp'),
  description_exp: text('description_exp'),
  img_exp: text('img_exp'),
});

export type Experience = InferSelectModel<typeof experience>;
export type NewExperience = InferInsertModel<typeof experience>;

// ── Projects ─────────────────────────────────────────────────────────────────

export const proyect = pgTable('Proyects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_pro: text('title_pro'),
  technologies_pro: text('technologies_pro'),
  description_pro: text('description_pro'),
  deployLink_pro: text('deployLink_pro'),
  githubLink_pro: text('githubLink_pro'),
  img1_pro: text('img1_pro'),
  img2_pro: text('img2_pro'),
  img3_pro: text('img3_pro'),
});

export const proyectEs = pgTable('Proyects_es', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_pro: text('title_pro'),
  technologies_pro: text('technologies_pro'),
  description_pro: text('description_pro'),
  deployLink_pro: text('deployLink_pro'),
  githubLink_pro: text('githubLink_pro'),
  img1_pro: text('img1_pro'),
  img2_pro: text('img2_pro'),
  img3_pro: text('img3_pro'),
});

export type Project = InferSelectModel<typeof proyect>;
export type NewProject = InferInsertModel<typeof proyect>;

// ── Skills ───────────────────────────────────────────────────────────────────

export const skills = pgTable('Skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type'),
  img_skill: text('img_skill'),
  name: text('name'),
  amount: integer('amount'),
});

export type Skill = InferSelectModel<typeof skills>;
export type NewSkill = InferInsertModel<typeof skills>;

// ── Social Media ─────────────────────────────────────────────────────────────

export const social = pgTable('SocialMedia', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  img: text('img'),
  url: text('url'),
});

export type Social = InferSelectModel<typeof social>;
export type NewSocial = InferInsertModel<typeof social>;

// ── User Phrases ─────────────────────────────────────────────────────────────

export const userPhrases = pgTable('UserPhrases', {
  id: uuid('id').defaultRandom().primaryKey(),
  main_phrase: text('main_phrase'),
  phrase1: text('phrase1'),
  phrase2: text('phrase2'),
  phrase3: text('phrase3'),
});

export const userPhrasesEs = pgTable('UserPhrases_es', {
  id: uuid('id').defaultRandom().primaryKey(),
  main_phrase: text('main_phrase'),
  phrase1: text('phrase1'),
  phrase2: text('phrase2'),
  phrase3: text('phrase3'),
});

export type UserPhrase = InferSelectModel<typeof userPhrases>;
export type NewUserPhrase = InferInsertModel<typeof userPhrases>;
