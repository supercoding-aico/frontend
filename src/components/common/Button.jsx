import '@styles/components/common/button.scss';

/**
 * 공용 버튼 컴포넌트
 * @param {string} type
 * @param {string} name
 * @param {'primary' | 'accent' | 'disabled'} theme
 * @param {boolean} isFull
 * @param {function} onClick
 */
const Button = ({ children, type, theme = 'primary', isFull = false, onClick = undefined }) => {
  return (
    <button
      type={type}
      className={`button button--${theme} ${isFull ? 'button--full' : ''}`}
      onClick={onClick}
      disabled={theme === 'disabled'}
    >
      {children}
    </button>
  );
};

export default Button;
