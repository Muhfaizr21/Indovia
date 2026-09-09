import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const session = Cookies.get('_INDOVIA_AUTH_KEY_') || localStorage.getItem('_INDOVIA_AUTH_KEY_');
  if (session) {
    try {
      const parsed = JSON.parse(session);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      // ignore JSON parse error
    }
  }
  return config;
});

function HttpClient() {
  return {
    get: api.get,
    post: api.post,
    patch: api.patch,
    put: api.put,
    delete: api.delete
  };
}
export default HttpClient();