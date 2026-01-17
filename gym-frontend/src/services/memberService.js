import api from '../config/api';

export const memberService = {
  getMembers: (params) => api.get('/members', { params }),
  getMember: (id) => api.get(`/members/${id}`),
  createMember: (data) => api.post('/members', data),
  updateMember: (id, data) => api.put(`/members/${id}`, data),
  deleteMember: (id) => api.delete(`/members/${id}`),
  getExpiringSoon: (days) => api.get('/members/expiring-soon', { params: { days } })
};