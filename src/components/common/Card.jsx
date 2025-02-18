import '@styles/components/common/card.scss';

/**
 * 카드 및 섹션 컴포넌트
 * @param {React.ReactNode} children
 */
const Card = ({ children }) => {
  return <section className='card'>{children}</section>;
};

export default Card;
