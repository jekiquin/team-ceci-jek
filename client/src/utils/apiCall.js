import axios from 'axios';

const BASE_URL = 'http://localhost:6969';

const storyApi = axios.create({
    baseURL: BASE_URL
});

const storyCalls = {
    startStory: () => (storyApi.get('/story')),
    nextStory: (id) => (storyApi.get(`/story/${id}`))
}

export default storyCalls;
