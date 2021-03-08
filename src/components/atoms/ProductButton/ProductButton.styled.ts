import styled from 'styled-components';

export const StyledProductButton = styled.button<{ keep?: boolean; sell?: boolean; put?: boolean; loading?: boolean }>`
  padding: 0.4em 1em;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.keep && '#3d27b9'};
  background-color: ${props => props.sell && '#c93838'};
  background-color: ${props => props.put && '#17a01e'};
  color: #fff;
  font-size: 0.675rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spin {
    -webkit-animation: spin 2s infinite linear;
    animation: spin 2s infinite linear;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
`;
