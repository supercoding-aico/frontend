export const errorMessages = {
  auth: {
    INVALID_CREDENTIALS: '이메일 또는 비밀번호가 잘못되었습니다.',
    EMAIL_ALREADY_EXISTS: '이미 가입된 이메일입니다.',
    NICKNAME_ALREADY_EXISTS: '이미 사용 중인 닉네임입니다.',
    UNAUTHORIZED: '로그인이 필요합니다.',
    DEFAULT: '로그인 중 문제가 발생했습니다.',
  },
  validation: {
    EMAIL_FORMAT: '이메일 형식이 올바르지 않습니다.',
    PASSWORD_WEAK: '비밀번호는 8자 이상이어야 하며, 숫자와 특수문자를 포함해야 합니다.',
    PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  },
  network: {
    TIMEOUT: '서버 응답이 지연되고 있습니다. 다시 시도해주세요.',
    SERVER_ERROR: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  },
};
