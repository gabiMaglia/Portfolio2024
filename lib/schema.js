import {
  pgTable,
  uuid,
  text,
  integer,
} from 'drizzle-orm/pg-core'

export const experience = pgTable('Experiences', {
  id: uuid('id').defaultRandom().primaryKey(),
  title_exp: text('title_exp'),
  institution_exp: text('institution_exp'),
  startDate_exp: text('startDate_exp'),
  endDate_exp: text('endDate_exp'),
  description_exp: text('description_exp'),
  img_exp: text('img_exp'),
})

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

export const user = pgTable('User', {
  id: uuid('id').defaultRandom().primaryKey(),
  name_persona: text('name_persona'),
  surname_persona: text('surname_persona'),
  dni_persona: text('dni_persona'),
  telephone_persona: text('telephone_persona'),
  photo_url: text('photo_url'),
})

export const userCredentials = pgTable('UserCredentials', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email'),
  password: text('password').notNull(),
})

export const userPhrases = pgTable('UserPhrases', {
  id: uuid('id').defaultRandom().primaryKey(),
  main_phrase: text('main_phrase'),
  phrase1: text('phrase1'),
  phrase2: text('phrase2'),
  phrase3: text('phrase3'),
})