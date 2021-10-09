import styled from 'styled-components';

export const ModalContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(45, 45, 45, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 16px;

  padding: 20px;
`;
