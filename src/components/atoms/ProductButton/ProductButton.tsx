import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { StyledProductButton } from './ProductButton.styled';

interface Props {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  buttonType: 'keep' | 'sell' | 'put';
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ProductButton: React.FC<Props> = ({ children, buttonType, loading, ...props }) => {
  if (buttonType === 'keep') {
    return (
      <StyledProductButton keep disabled={loading} {...props}>
        {loading ? <FaSpinner className="spin" /> : children}
      </StyledProductButton>
    );
  } else if (buttonType === 'sell') {
    return (
      <StyledProductButton sell disabled={loading} {...props}>
        {loading ? <FaSpinner className="spin" /> : children}
      </StyledProductButton>
    );
  } else if (buttonType === 'put') {
    return (
      <StyledProductButton put disabled={loading} {...props}>
        {loading ? <FaSpinner className="spin" /> : children}
      </StyledProductButton>
    );
  } else {
    return null;
  }
};

export default React.memo(ProductButton);
