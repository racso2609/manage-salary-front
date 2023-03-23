import axios from 'axios';
import { API_URL } from '../constants';
import notify from './notify';

export const fetcher = (url: string, fieldName?: string) =>
    axios.get(API_URL + url).then((r) => {
        if (fieldName) r.data[fieldName];
        return r.data;
    });
export const fetcherWithToken = (
    url: string,
    token: string,
    fieldName?: string
) =>
    axios({
        url: API_URL + url,
        method: 'get',
        headers: { Authorization: token },
    })
        .then((r) => {
            if (fieldName) return r.data[fieldName];
            return r.data;
        })
        .catch((e) => {
            console.log(e);
            notify.send({
                type: 'Error',
                message: e?.response?.data?.error || e.message,
                title: 'Error',
            });
        });
