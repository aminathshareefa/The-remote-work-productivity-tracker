import API from './api';

export const getTasks = (userId) => API.get(`/tasks/employee/${userId}`);
export const updateTask = (id, data) => API.patch(`/tasks/${id}`, data);
export const createTask = (data) => API.post('/tasks', data);