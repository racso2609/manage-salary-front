import axios from 'axios';

export const fetcher = (url: string, fieldName?: string) =>
    axios.get(url).then((r) => {
        if (fieldName) r.data[fieldName];
        return r.data;
    });
export const fetcherWithToken = (
    url: string,
    token: string,
    fieldName?: string
) =>
    axios
        .get(url, {
            headers: { Authentication: token },
        })
        .then((r) => {
            if (fieldName) r.data[fieldName];
            return r.data;
        });
