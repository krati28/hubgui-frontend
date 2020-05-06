import axios from 'axios';

const MNP_API_BASE_URL = 'http://localhost:8105/mnpdetails';

class MNPService {

    fetchMNPdetails() {
        return axios.get(MNP_API_BASE_URL);
    }

    fetchMNPById(mnp_id) {
        return axios.get(MNP_API_BASE_URL + '/' + mnp_id);
    }

    deleteMNP(mnp_id) {
        return axios.delete(MNP_API_BASE_URL + '/' + mnp_id);
    }

addMNP(mnp) {
        return axios.post(""+MNP_API_BASE_URL,mnp);
    }

editMNP(mnp) {
        return axios.put(MNP_API_BASE_URL + '/' + mnp.mnp_id, mnp);
    }

}

export default new MNPService();
