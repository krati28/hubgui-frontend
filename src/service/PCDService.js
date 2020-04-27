import axios from 'axios';

const PCD_API_BASE_URL = 'http://localhost:8101/pcddetails';

class PCDService {

    fetchPcddetails() {
        return axios.get(PCD_API_BASE_URL);
    }

    fetchPcdById(ptcode_id) {
        return axios.get(PCD_API_BASE_URL + '/' + ptcode_id);
    }

    deletePcd(ptcode_id) {
        return axios.delete(PCD_API_BASE_URL + '/' + ptcode_id);
    }

addPcd(pcd) {
        return axios.post(""+PCD_API_BASE_URL,pcd);
    }

editPcd(pcd) {
        return axios.put(PCD_API_BASE_URL + '/' + pcd.ptcode_id, pcd);
    }

}

export default new PCDService();
