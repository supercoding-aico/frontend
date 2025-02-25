import { useState } from 'react';
import '@styles/components/common/form-input.scss';
import Button from '@components/common/Button';
import { CheckCircle } from 'react-feather';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

const FormInput = ({
  name,
  label,
  type,
  onChange,
  onClick = undefined,
  required = true,
  validator,
  helpText,
}) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputValue = (e) => {
    let { value } = e.target;

    if (type === 'tel') {
      value = formatPhoneNumber(value);
    }

    setValue(value);
    if (onChange) {
      onChange(value);
    }

    if (validator) {
      setIsValid(typeof validator === 'function' ? validator(value) : validator.test(value));
    }
  };

  return (
    <div className='form-input'>
      <label className='form-input__label' htmlFor={`form-${label}`}>
        {label}
      </label>
      <div className='form-input__input-container'>
        <input
          className='form-input__input'
          id={`form-${label}`}
          name={name}
          type={type}
          value={value}
          required={required}
          onChange={handleInputValue}
          autoComplete='off'
        />
        {onClick && (
          <Button type='button' onClick={onClick}>
            중복 확인
          </Button>
        )}
      </div>
      {!isValid && helpText && <p className='form-input__helptext'>{helpText}</p>}
    </div>
  );
};

export default FormInput;
