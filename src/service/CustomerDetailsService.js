import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8105/customer';

class CustomerDetailsService {

    fetchDeals() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchDealById(dealId) {
        return axios.get(USER_API_BASE_URL + '/' + dealId);
    }

    deleteDeal(dealId) {
        return axios.delete(USER_API_BASE_URL + '/' + dealId);
    }

    addDeal(deal_data) {
        return axios.post(""+USER_API_BASE_URL, deal_data);
    }

    editDeal(deal_data) {
        return axios.put(USER_API_BASE_URL + '/' + deal_data.id, deal_data);
    }

}

export default new CustomerDetailsService();