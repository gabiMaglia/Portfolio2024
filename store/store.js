import { create } from "zustand";

export const useUserStore = create((set) => ({
  persona: {},
  proyects: [],
  experiences: [],
  skill: [],
  social: [],
  phrases: [],



  setPersona: (newPersona) => set({ persona: newPersona }),
  setProyects: (newProyects) => set({ proyects: newProyects }),
  setExperiences: (newExperiences) => set({ experiences: newExperiences }),
  setSkill: (newSkill) => set({ skill: newSkill }),
  setSocial: (newSocial) => set({ social: newSocial }),
  setPhrases: (newPhrase) => set({ phrases: newPhrase }),
  
}));