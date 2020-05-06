import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8105/deal';

class DealService {

    fetchDeals() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchDealById(id) {
        return axios.get(USER_API_BASE_URL + '/' + id);
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

export default new DealService();