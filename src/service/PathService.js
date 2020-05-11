import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8105/pathdetails';

class LcrApiService {

    fetchPathdetails() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchPathById(pathId) {
        return axios.get(USER_API_BASE_URL + '/' + pathId);
    }

    deletePath(pathId) {
        return axios.delete(USER_API_BASE_URL + '/' + pathId);
    }

    addPath(path_data) {
        return axios.post(""+USER_API_BASE_URL, path_data);
    }

    editPath(path_data) {
        return axios.put(USER_API_BASE_URL + '/' + path_data.path_id, path_data);
    }

}

export default new LcrApiService();