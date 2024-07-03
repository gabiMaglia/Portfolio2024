
'use client'

import { getAllData, getPersonalData, getPersonalSocialMediaData } from "@/serevices/fetchUserData";
import { useUserStore } from "@/store/store";
import { useEffect, useState } from "react";

const StoreProvider = ({data}) => {
    const [userData, setUserData] = useState(false)

    const setPersona = useUserStore((state) => state.setPersona);
    const setProjects = useUserStore((state) => state.setProjects);
    const setExperiences = useUserStore((state) => state.setExperiences);
    const setSkill = useUserStore((state) => state.setSkill);
    const setSocial = useUserStore((state) => state.setSocial);

    useEffect(() => {
        const fetchData = async () => {
          if (userData) return
           
          const data = await getPersonalData()
          const socialData = await getPersonalSocialMediaData()
          setUserData({...data, ...socialData})
    
          const restOfData  = await getAllData()
          console.log(data)
          setPersona(data);
          setSocial(socialData);
          setProjects(restOfData.projects);
          setExperiences(restOfData.experiences);
          setSkill(restOfData.skill);
          
          return
        }
        fetchData();
        const populateStore = () => {
        } 
      }, [userData])
}
 
export default StoreProvider;