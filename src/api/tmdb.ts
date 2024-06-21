import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'ko-KR', // 한국어로 설정
  },
});

export default tmdbApi;
