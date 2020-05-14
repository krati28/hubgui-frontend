

import axios from 'axios';

const CCP_API_BASE_URL = 'http://localhost:8105/profiledetails';
const P_API_BASE_URL = 'http://localhost:8105/profiledetails/credits';

class CreditService {

    fetchProfiledetails() {
        return axios.get(P_API_BASE_URL);
    }

    fetchProfileById(profile_id) {
        return axios.get(CCP_API_BASE_URL + '/' + profile_id);
    }

    deleteProfile(profile_id) {
        return axios.delete(CCP_API_BASE_URL + '/' + profile_id);
    }

addProfile(profile) {
        return axios.post(""+CCP_API_BASE_URL,profile);
    }

editProfile(profile) {
        return axios.put(CCP_API_BASE_URL + '/' + profile.profile_id, profile);
    }

}

export default new CreditService();
