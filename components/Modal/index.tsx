import { useRef, ReactChild, ReactChildren, MouseEvent } from 'react';

import * as Styled from './styled';

const Modal = ({
  children,
  close,
}: {
  children: ReactChildren | ReactChild;
  close?: () => void;
}) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e: MouseEvent) => {
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
