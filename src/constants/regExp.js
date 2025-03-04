export const regExp = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
  nickname: /^[a-zA-Z0-9가-힣]{2,10}$/,
  phoneNumber: /^[\d-]+$/,
  teamName: /^[a-zA-Z0-9가-힣]{2,20}$/,
};
