import { postRefreshToken } from '@/services/AuthService/authService';

const autoRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    if (refreshToken) {
      const response = await postRefreshToken({ refreshToken });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default autoRefreshToken;
