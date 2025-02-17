module.exports = {
  trailingComma: 'es5', // ES5에서 허용되는 후행 콤마 추가
  tabWidth: 2, // 탭 크기를 2칸으로 설정
  semi: true, // 문장 끝에 세미콜론 추가
  singleQuote: true, // 문자열을 작은따옴표로 통일
  printWidth: 100, // 한 줄 최대 길이를 100자로 설정 (가독성 고려)
  arrowParens: 'always', // 화살표 함수의 매개변수가 하나여도 괄호를 유지
  endOfLine: 'auto', // 운영체제에 따라 자동으로 줄바꿈 문자 설정 (Windows는 CRLF, macOS는 LF)
  bracketSpacing: true, // 객체 리터럴에서 중괄호 앞뒤로 공백 추가
  jsxSingleQuote: true, // JSX에서 작은따옴표 사용
  proseWrap: 'preserve', // 마크다운에서 자동 줄바꿈 방지
  htmlWhitespaceSensitivity: 'css', // HTML 파일의 공백 처리를 CSS 방식으로 유지
  embeddedLanguageFormatting: 'auto', // 코드 블록 내의 다른 언어도 자동 포맷팅
};
