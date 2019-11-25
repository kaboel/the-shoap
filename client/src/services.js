import Axios from 'axios'

const api = () => {
  return Axios.create({
    baseURL: `https://localhost:8089/v0`
  });
}

export default () => {
  function getAllProducts() {
    return api.get('/products').then(result => {
      return result;
    }).catch(err => {
      return err;
    });
  }

  function getProductById(id) {
    return api.get(`/product`).then(result => {
      return result;
    }).catch(err => {
      return err;
    })
  }

  function getAllOrders() {
    return api.get('/orders').then(result => {
      return result;
    }).catch(err => {
      return err;
    })
  }

  function getOrderById(id) {
    return api.get(`/order/id`).then(result => {
      return result;
    }).catch(err => {
      return err;
    })
  }
}
