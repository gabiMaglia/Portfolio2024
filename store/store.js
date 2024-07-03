import { create } from "zustand";

export const useUserStore = create((set) => ({
  persona: {},
  projects: [],
  experiences: [],
  skill: [],
  social: [],
  setPersona: (newPersona) => set({ persona: newPersona }),
  setProjects: (newProjects) => set({ projects: newProjects }),
  setExperiences: (newExperiences) => set({ experiences: newExperiences }),
  setSkill: (newSkill) => set({ skill: newSkill }),
  setSocial: (newSocial) => set({ social: newSocial }),
}));