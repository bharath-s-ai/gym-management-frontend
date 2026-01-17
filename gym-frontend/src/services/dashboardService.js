import api from '../config/api';

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getRevenueChart: (months) => api.get('/dashboard/revenue-chart', { params: { months } }),
  getAttendanceChart: (days) => api.get('/dashboard/attendance-chart', { params: { days } }),
  getMembershipDistribution: () => api.get('/dashboard/membership-distribution')
};