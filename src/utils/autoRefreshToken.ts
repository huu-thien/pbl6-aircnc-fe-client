import { postRefreshToken } from '@/services/AuthService/authService';

const autoRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await postRefreshToken({ refreshToken: JSON.parse(refreshToken as string) });
    if (response.status == 401) {
      console.log('400444');
    }
    const { accessToken } = response.data;
    console.log('accessToken', accessToken);
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.log('refresh token het han -> logout');
    console.log(error);
    throw error;
  }
};

export default autoRefreshToken;
