import { useState } from 'react';
import '@styles/components/common/form-input.scss';
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
        {label}
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
      {!isValid && helpText && <p className='form-input__helptext'>{helpText}</p>}
    </div>
  );
};

export default FormInput;
