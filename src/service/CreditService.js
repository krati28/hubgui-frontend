import axios from 'axios';

const CCP_API_BASE_URL = 'http://localhost:8101/profiledetails';
const THR_API_BASE_URL ='http://localhost:8101/thresholddetails';

class CreditService {

    fetchPcddetails() {
        return axios.get(CCP_API_BASE_URL);
    }

    // fetchPcdById(ptcode_id) {
    //     return axios.get(PCD_API_BASE_URL + '/' + ptcode_id);
    // }

    // deletePcd(ptcode_id) {
    //     return axios.delete(PCD_API_BASE_URL + '/' + ptcode_id);
    // }

addProfile(profile) {
        return axios.post(""+CCP_API_BASE_URL,profile);
    }
addThreshold(threshold){
    return axios.post(""+THR_API_BASE_URL,threshold);
}

// editPcd(pcd) {
//         return axios.put(PCD_API_BASE_URL + '/' + pcd.ptcode_id, pcd);
//     }

}

export default new CreditService();
