export const ERROR_MESSAGES = {
  authMsg: {
    INVALID_CREDENTIALS: '이메일 또는 비밀번호가 잘못되었습니다.',
    ALREADY_EXISTS: '이미 사용 중입니다.',
    UNAUTHORIZED: '로그인이 필요합니다.',
    DEFAULT: '로그인 중 문제가 발생했습니다.',
  },
  validationMsg: {
    EMPTY_VALUE: '값을 입력해 주세요.',
    EMAIL_FORMAT: '이메일 형식이 올바르지 않습니다.',
    PASSWORD_WEAK: '비밀번호는 8~20자 사이로 영문자, 숫자, 특수문자를 포함해야 합니다.',
    PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
    NICKNAME_WEAK: '닉네임은 2~10자 사이로 영문자, 숫자, 한글만 사용 가능합니다.',
    PHONE_NUMBER_FORMAT: '숫자만 입력해 주세요',
  },
  networkMsg: {
    TIMEOUT: '서버 응답이 지연되고 있습니다. 다시 시도해주세요.',
    SERVER_ERROR: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  },
};
