import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import httpClient from '@/helpers/httpClient';
const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    saveSession
  } = useAuthContext();
  const [searchParams] = useSearchParams();
  const {
    showNotification
  } = useNotificationContext();
  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'admin@indovia.com',
      password: 'admin'
    }
  });
  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) navigate(redirectLink);
    else navigate('/dashboard');
  };
  const login = handleSubmit(async values => {
    try {
      setLoading(true);
      const res = await httpClient.post('/auth/login', values);
      const responseData = res.data;
      const token = responseData.data?.token || responseData.token;
      const user = responseData.data?.user || responseData.user || responseData;

      if (token) {
        saveSession({
          ...user,
          token: token
        });
        redirectUser();
        showNotification({
          message: 'Berhasil login sebagai Super Admin Indovia! Mengalihkan ke dashboard...',
          variant: 'success'
        });
      }
    } catch (e) {
      console.error('Login error:', e);
      const errorMsg = e.response?.data?.message || e.response?.data?.error || (e.message ? `Koneksi gagal: ${e.message}` : 'Email atau password salah');
      showNotification({
        message: errorMsg,
        variant: 'danger'
      });
    } finally {
      setLoading(false);
    }
  });
  return {
    loading,
    login,
    control
  };
};
export default useSignIn;