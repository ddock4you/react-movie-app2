import axios from 'axios';
// axios 업데이트로 인한 버그로 인해 .18.1 버전으로 설치
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '45bcd72b99978155fb347a036ccc1664',
        language: 'en-US'
    }
});

export const moviesApi = {
    nowPlaying: () => api.get('movie/now_playing'),
    upcoming: () => api.get('movie/upcoming'),
    popular: () => api.get('movie/popular'),
    movieDetail: id =>
    api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: term =>
        api.get("search/movie", {
            params: {
        query: encodeURIComponent(term)
        }
    })
};
  
export const tvApi = {
    topRated: () => api.get('tv/top_rated'),
    popular: () => api.get('tv/popular'),
    airingToday: () => api.get('tv/airing_today'),
    showDetail: id =>
    api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: term =>
    api.get("search/tv", {
        params: {
            query: encodeURIComponent(term)
        }
    })
};

