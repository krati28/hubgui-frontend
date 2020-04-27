import axios from 'axios';

const USER_API_BASE_URL = 'http://192.168.105.179:8101/users';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(clusterId) {
        return axios.get(USER_API_BASE_URL + '/' + clusterId);
    }

    deleteUser(clusterId) {
        return axios.delete(USER_API_BASE_URL + '/' + clusterId);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.cluster_id, user);
    }

}

export default new ApiService();