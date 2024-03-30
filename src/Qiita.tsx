import axios, { AxiosResponse } from 'axios';
import { accessToken } from './environment/AccessToken.tsx';
import { initialURL } from './environment/InitialURL.tsx';

interface QiitaItem {
    id: string;
    title: string;
    body: string;
}

export const getAllQiita = async (url: string): Promise<QiitaItem[] | null> => {
    try {
        const response: AxiosResponse<QiitaItem[]> = await axios.get(url, {
            headers: {
                'Authorization': accessToken
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error', error);
        return null;
    }
};

export const getItemById = async (itemId: string): Promise<QiitaItem | null> => {
    try {
        const response: AxiosResponse<QiitaItem> = await axios.get(`${initialURL}/${itemId}`, {
            headers: {
                'Authorization': accessToken
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error', error);
        return null;
    }
};
