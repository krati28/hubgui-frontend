import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8101/rllist';

class RedirectionListService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(id) {
        return axios.get(USER_API_BASE_URL + '/' + id);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

}

export default new RedirectionListService();

