"use client";

import { useUserStore } from "@/store/store";

const StoreProvider = ({ data }) => {
  const setPersona = useUserStore((state) => state.setPersona);
  const setProyects = useUserStore((state) => state.setProyects);
  const setExperiences = useUserStore((state) => state.setExperiences);
  const setSkill = useUserStore((state) => state.setSkill);
  const setSocial = useUserStore((state) => state.setSocial);
  const setPhrases = useUserStore((state) => state.setPhrases);

  setPersona(data?.data);
  setSocial(data?.socialData);
  setProyects(data?.restOfData?.proyects);
  setExperiences(data?.restOfData?.experiences);
  setSkill(data?.restOfData?.skill);
  setPhrases({mainPhrase :data?.data?.main_phrase, phrase1: data?.data?.phrase1})
};


export default StoreProvider;
