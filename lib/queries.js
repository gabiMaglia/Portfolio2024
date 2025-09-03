import { db } from '@/lib/db'
import { experience, proyect, skills, social, userPhrases, experienceEs, proyectEs, userPhrasesEs } from '@/lib/schema'
export const fetchExperiences = async (locale = 'en') =>
  locale === 'es' ? db.select().from(experienceEs) : db.select().from(experience)

export const fetchProyects = async (locale = 'en') =>
  locale === 'es' ? db.select().from(proyectEs) : db.select().from(proyect)

export const fetchSkills = async () => db.select().from(skills)
export const fetchSocials = async () => db.select().from(social)

export const fetchUserPhrases = async (locale = 'en') =>
  locale === 'es' ? db.select().from(userPhrasesEs) : db.select().from(userPhrases)

