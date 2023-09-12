import React, { useEffect } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ toogleModal, dataLargeImage }) => {
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        toogleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toogleModal]);

  const { largeImageURL, tags } = dataLargeImage;

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toogleModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={onOverlayClick}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  toogleModal: PropTypes.func.isRequired,
  dataLargeImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;
