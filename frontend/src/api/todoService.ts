import axios from 'axios';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 'http://localhost:8000/api', // Ajusta se necessário
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/todos');
  return response.data;
};

export const createTask = async (data: Omit<Task, 'id' | 'completed'>): Promise<Task> => {
  const response = await api.post<Task>('/todos', data);
  return response.data;
};

export const updateTask = async (id: number, data: Partial<Task>): Promise<Task> => {
  const response = await api.put<Task>(`/todos/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: number): Promise<{
  status: string;
  message: string;
  item_deleted: Task;
}> => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
