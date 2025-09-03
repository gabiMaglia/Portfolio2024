import { db } from '@/lib/db'
import { experience, proyect, skills, social, userPhrases, experience_es, proyect_es, userPhrases_es } from '@/lib/schema'

export const fetchExperiences = async (locale = 'es') => {
  return locale === 'es'
    ? db.select().from(experience_es)
    : db.select().from(experience)
}

// Proyects
export const fetchProyects = async (locale = 'es') => {
  return locale === 'es'
    ? db.select().from(proyect_es)
    : db.select().from(proyect)
}

// UserPhrases
export const fetchUserPhrases = async (locale = 'es') => {
  return locale === 'es'
    ? db.select().from(userPhrases_es)
    : db.select().from(userPhrases)
}

export const fetchSkills = async () => db.select().from(skills)
export const fetchSocials = async () => db.select().from(social)

