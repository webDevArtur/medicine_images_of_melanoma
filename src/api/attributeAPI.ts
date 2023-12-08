import axios from "axios";

const API_BASE_URL = "https://by-alot.me";

export const templatesAPI = {
  async getTemplatesData(limit: number, offset: number, isMarked: string, filter?: string) {
    const res = await axios.get(filter ? `${API_BASE_URL}/images/search_image?limit=${limit}&offset=${offset}&filter=${filter}&is_marked=${isMarked}` : `${API_BASE_URL}/images/search_image?limit=${limit}&offset=${offset}&is_marked=${isMarked}`, {
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "ngrok-skip-browser-warning": "69420",
      },
      withCredentials: true,
    })
    return res.data;
  },

  async postTemplatesData(name: string, body: any) {
    const res = axios.post(`${API_BASE_URL}/images/update/${name}`, body, {
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "ngrok-skip-browser-warning": "69420",
      },
      withCredentials: true,
    })
    return res;
  },
};