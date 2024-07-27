import axios from "axios";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rickmortyapp-gwen-gabimaglia.koyeb.app/";

export const getAllData = async () => {
  try {
    const endpoints = [ "proyects", "experiences", "skill"];
    const promises = endpoints.map((endpoint) =>
      axios.get(`${API}get/${endpoint}`).then((response) => ({
        endpoint,
        data: response.data,
      }))
    );
    const userData = await Promise.all(promises);

    const objData = {};
    userData.map((e) => {
   
      objData[e.endpoint] = e.data;
    });
    return objData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPersonalData = async () => {
  try {
    const { data } = await axios.get(`${API}get/persona`);
    return data;
    console.log(data)
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPersonalSocialMediaData = async () => {
  try {
    const { data } = await axios.get(`${API}get/social`);

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
