import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8105/lcrdetails';

class LcrApiService {

    fetchLcrdetails() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchLcrById(lcrId) {
        return axios.get(USER_API_BASE_URL + '/' + lcrId);
    }

    deleteLcr(lcrId) {
        return axios.delete(USER_API_BASE_URL + '/' + lcrId);
    }

    addLcr(lcr_data) {
        return axios.post(""+USER_API_BASE_URL, lcr_data);
    }

    editLcr(lcr_data) {
        return axios.put(USER_API_BASE_URL + '/' + lcr_data.lcr_id, lcr_data);
    }

}

export default new LcrApiService();