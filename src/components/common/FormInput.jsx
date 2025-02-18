import { useState } from 'react';
import '@styles/components/common/form-input.scss';
import P from '@components/common/P';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

const FormInput = ({ label, type, required = true, regex, helpText }) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputValue = (e) => {
    let { value } = e.target;

    if (type === 'tel') {
      value = formatPhoneNumber(value);
    }

    setValue(value);

    if (regex) {
      setIsValid(regex.test(value));
    }
  };

  return (
    <div className='form-input'>
      <label className='form-input__label' htmlFor={`form-${label}`}>
        <P theme='span'>{label}</P>
      </label>
      <input
        className='form-input__input'
        id={`form-${label}`}
        type={type}
        value={value}
        required={required}
        onChange={handleInputValue}
        autoComplete='off'
      />
      {!isValid && helpText && (
        <div className='form-input__helptext'>
          <P theme='helptext'>{helpText}</P>
        </div>
      )}
    </div>
  );
};

export default FormInput;
