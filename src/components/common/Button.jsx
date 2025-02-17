import '../../styles/components/common/button.scss';

/**
 * 공용 버튼 컴포넌트
 * @param {string} type
 * @param {string} name
 * @param {'primary' | 'success' | 'cancel' | 'disabled'} theme
 * @param {function} onClick
 */
const Button = ({ type, name, theme = 'primary', onClick }) => {
  return (
    <button
      type={type}
      className={`button ${theme}`}
      onClick={onClick}
      disabled={theme === 'disabled'}
    >
      {name}
    </button>
  );
};

export default Button;
