export const extractToken = (response) => {
  if (!response) return null;

  const accessToken = response.headers?.authorization;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
};

export const getToken = () => localStorage.getItem('accessToken');

export const clearToken = () => {
  localStorage.removeItem('accessToken');
};
