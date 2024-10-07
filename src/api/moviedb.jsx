import axios from 'axios';

// endpoint local api
const TrendingMoviesEndpoint = 'https://web-films-api.vercel.app/found';
const movieDetailsEndpoint = id => `https://web-films-api.vercel.app/${id}`;
const searchMoviesEndpoint = query => `https://web-films-api.vercel.app/search?titulo=${query}`;

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};

export const fetchTrendingMovies = () => {
    return apiCall(TrendingMoviesEndpoint);
};

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
};

export const searchMovies = async (query) => {
    return apiCall(searchMoviesEndpoint(query));
};
