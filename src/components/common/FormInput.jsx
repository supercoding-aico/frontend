import { useState } from 'react';
import '@styles/components/common/form-input.scss';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

const FormInput = ({
  name,
  label,
  type,
  value,
  placeholder,
  onChange,
  button = undefined,
  required = true,
  validator,
  helpText,
  readOnly = false,
  options = [],
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value ?? '');
  const [isValid, setIsValid] = useState(true);

  const handleInputValue = (e) => {
    let { value } = e.target;

    if (type === 'tel') {
      value = formatPhoneNumber(value);
    }

    setInputValue(value);
    if (onChange) {
      onChange(value);
    }

    if (validator) {
      setIsValid(typeof validator === 'function' ? validator(value) : validator.test(value));
    }
  };

  return (
    <div className='form-input'>
      <label className='form-input__label' htmlFor={`form-${name}`}>
        {label}
      </label>
      <div className='form-input__input-container'>
        {type === 'radio' ? (
          options.map((option) => (
            <label key={option.id} className='form-input__radio'>
              <input
                type='radio'
                name={name}
                value={option.value}
                checked={inputValue === option.value}
                onChange={handleInputValue}
                disabled={readOnly}
              />
              {option.name}
            </label>
          ))
        ) : (
          <input
            className='form-input__input'
            id={`form-${name}`}
            name={name}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            required={required}
            onChange={handleInputValue}
            autoComplete='off'
            readOnly={readOnly}
            {...rest}
          />
        )}
        {button}
      </div>
      {!isValid && helpText && <p className='form-input__helptext'>{helpText}</p>}
    </div>
  );
};

export default FormInput;
