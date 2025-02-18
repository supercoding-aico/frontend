import '@styles/components/common/p.scss';

/**
 * 텍스트 컴포넌트
 * @param {'title' | 'text' | 'span' | 'subtext' | 'helptext' } theme
 * @param {React.ReactNode} children
 */
const P = ({ theme = 'text', children }) => {
  const Tag = theme === 'span' ? 'span' : theme === 'title' ? 'h1' : 'p';

  return <Tag className={theme}>{children}</Tag>;
};

export default P;
