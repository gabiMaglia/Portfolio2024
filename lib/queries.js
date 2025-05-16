import { db } from '@/lib/db'
import { experience, proyect, skills, social, userPhrases } from '@/lib/schema'

export const fetchExperiences = async () => db.select().from(experience)
export const fetchProyects = async () => db.select().from(proyect)
export const fetchSkills = async () => db.select().from(skills)
export const fetchSocials = async () => db.select().from(social)
export const fetchUserPhrases = async () => db.select().from(userPhrases)

