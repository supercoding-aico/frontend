/**
 * 텍스트 컴포넌트
 * @param {'title' | 'text' | 'span' | 'subtext' | 'helptext' } theme
 * @param {React.ReactNode} children
 */
const P = ({ type = 'text', children }) => {
  const Tag = type === 'span' ? 'span' : type === 'title' ? 'h1' : 'p';

  return <Tag className={type}>{children}</Tag>;
};

export default P;
