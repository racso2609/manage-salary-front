import axios from 'axios';
import { totalData } from '../interfaces/total';
// import notify from "../utils/notify";
import { API_URL } from '../constants';

export const totalFetcher = async (url: string, token: string) => {
    const { data }: { data: totalData } = await axios.get(`${API_URL}${url}`, {
        headers: { Authorization: token },
    });
    return data;
};
