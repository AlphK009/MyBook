import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
  className: string;
  disabled?: boolean; // Adding the disabled prop here
};

const Button: React.FC<Props> = ({ text, onClick, className, disabled = false }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className={className}
        disabled={disabled} // Using the disabled prop here
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
