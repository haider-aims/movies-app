import axios from 'axios';
import { TMDB_ACCESS_TOKEN } from './env';

export const tmdbInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
});