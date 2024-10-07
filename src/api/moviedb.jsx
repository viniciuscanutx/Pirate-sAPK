import axios from 'axios';

// endpoint local api

const TrendingMoviesEndpoint = 'https://web-films-api.vercel.app/found'

const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint, 
        params: params? params: {}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return{}
    }
}

export const fetchTrendingMovies = ()=>{
    return apiCall(TrendingMoviesEndpoint);
}