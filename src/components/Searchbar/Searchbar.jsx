import React, { useState, useCallback } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const reset = useCallback(() => setText(''), []);
  
  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (text === '') {
        toast.error('Please, input your query for search!', {
          autoClose: 5000,
        });
        return;
      }
      onSubmit(text);
      reset();
    },
    [onSubmit, text, reset]
  );

  const onHadleChange = useCallback((e) => {
    const query = e.target.value.trim();
    setText(query);
  }, []);

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}></span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={text}
          onChange={onHadleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
