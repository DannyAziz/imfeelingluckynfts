import { useRef } from 'react';

import * as Styled from './styled';

const Modal = ({ children, close }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (e.target === modalRef.current) {
      if (close) {
        close();
      }
    }
  };

  return (
    <Styled.ModalContainer ref={modalRef} onClick={handleOutsideClick}>
      <Styled.Modal>{children}</Styled.Modal>
    </Styled.ModalContainer>
  );
};

export default Modal;
