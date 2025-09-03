import {
  pgTable,
  uuid,
  text,
  integer,
} from 'drizzle-orm/pg-core'

/* ---------- EXPERIENCES ---------- */
export const experience = pgTable('Experiences', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_exp: text('title_exp'),
  institution_exp: text('institution_exp'),
  startDate_exp: text('startDate_exp'),
  endDate_exp: text('endDate_exp'),
  description_exp: text('description_exp'),
  img_exp: text('img_exp'),
})

// Español
export const experience_es = pgTable('Experiences_es', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_exp: text('title_exp'),
  institution_exp: text('institution_exp'),
  startDate_exp: text('startDate_exp'),
  endDate_exp: text('endDate_exp'),
  description_exp: text('description_exp'),
  img_exp: text('img_exp'),
})

/* ---------- PROYECTS ---------- */
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
  own: text('own'), 
})

// Español
export const proyect_es = pgTable('Proyects_es', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_pro: text('title_pro'),
  technologies_pro: text('technologies_pro'),
  description_pro: text('description_pro'),
  deployLink_pro: text('deployLink_pro'),
  githubLink_pro: text('githubLink_pro'),
  img1_pro: text('img1_pro'),
  img2_pro: text('img2_pro'),
  img3_pro: text('img3_pro'),
  own: text('own'), 
})

/* ---------- USER PHRASES ---------- */
export const userPhrases = pgTable('UserPhrases', {
  id: uuid('id').defaultRandom().primaryKey(),
  main_phrase: text('main_phrase'),
  phrase1: text('phrase1'),
  phrase2: text('phrase2'),
  phrase3: text('phrase3'),
})

// Español
export const userPhrases_es = pgTable('UserPhrases_es', {
  id: uuid('id').defaultRandom().primaryKey(),
  main_phrase: text('main_phrase'),
  phrase1: text('phrase1'),
  phrase2: text('phrase2'),
  phrase3: text('phrase3'),
})


export const skills = pgTable('Skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type'),
  img_skill: text('img_skill'),
  name: text('name'),
  amount: integer('amount'),
})


export const social = pgTable('SocialMedia', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  img: text('img'),
  url: text('url'),
})

