module.exports = {
  env: {
    browser: true, // 브라우저 환경에서 실행되는 코드로 설정
    node: true, // Node.js 환경에서 실행되는 코드로 설정
    es2021: true, // ECMAScript 2021 버전 코드 사용
  },
  extends: [
    'eslint:recommended', // 기본 ESLint 추천 규칙을 사용
    'plugin:react/recommended', // React 관련 추천 규칙을 사용
    'plugin:prettier/recommended', // Prettier와 ESLint 통합 설정
    'plugin:@tanstack/eslint-plugin-query/recommended', // TanStack Query 관련 추천 규칙을 사용
  ],
  parserOptions: {
    ecmaVersion: 12, // ECMAScript 2021 문법을 사용할 수 있도록 설정
    sourceType: 'module', // ES 모듈을 사용할 수 있도록 설정
    ecmaFeatures: {
      jsx: true, // JSX 문법을 사용할 수 있도록 설정
    },
  },
  rules: {
    'no-console': 'off', // console.log 사용에 경고 안 함
    'no-unused-vars': 'warn', // 사용되지 않는 변수에 경고
    'react/prop-types': 'off', // prop-types 규칙을 끔 (선택 사항)
    'react/react-in-jsx-scope': 'off', // React 17 이후 자동으로 JSX를 변환하므로 이 규칙을 끔
  },
  settings: {
    react: {
      version: 'detect', // React 버전을 자동으로 감지
    },
  },
};
