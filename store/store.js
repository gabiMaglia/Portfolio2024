import { create } from "zustand";

export const useUserStore = create((set) => ({
  persona: {},
  projects: [],
  experiences: [],
  skill: [],
  social: [],
  phrases: [],


  setPersona: (newPersona) => set({ persona: newPersona }),
  setProjects: (newProjects) => set({ projects: newProjects }),
  setExperiences: (newExperiences) => set({ experiences: newExperiences }),
  setSkill: (newSkill) => set({ skill: newSkill }),
  setSocial: (newSocial) => set({ social: newSocial }),
  setPhrases: (newPhrase) => set({ phrases: newPhrase }),
  
}));