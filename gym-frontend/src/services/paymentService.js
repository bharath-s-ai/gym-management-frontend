import api from '../config/api';

export const paymentService = {
  getPayments: (params) => api.get('/payments', { params }),
  getPayment: (id) => api.get(`/payments/${id}`),
  createPayment: (data) => api.post('/payments', data),
  getPaymentStats: (params) => api.get('/payments/stats', { params })
};