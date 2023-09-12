import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import s from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

const API_KEY = '38442536-4b02577f719ec61ae18bd0825';

const App = () => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [dataLargeImage, setDataLargeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (text === '') return;

    setIsLoading(true);
    setIsError(false);

    const queryParams = {
      q: text,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    };

    axios
      .get('https://pixabay.com/api/', { params: queryParams })
      .then(response => {
        if (response.data.hits.length === 0) {
          throw new Error('error');
        }
        setSearchData(prevSearchData => [...prevSearchData, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [text, page]);

  const onSubmitNewSearch = newText => {
    setText(newText);
    setPage(1);
    setSearchData([]);
    setTotalHits(0);
  };

  const onLoadMore = () => {
    if (searchData.length < totalHits) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const onHandleClickImage = useCallback(data => {
    setDataLargeImage(data);
  }, []);

  const scrollPage = useCallback(snapshot => {
    window.scrollTo({
      top: snapshot - 250,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (searchData.length > 0 && page > 1) {
      const snapshot = document.body.clientHeight;
      scrollPage(snapshot);
    }
  }, [searchData, page, scrollPage]);

  useEffect(() => {
    if (isError) {
      toast.error('Sorry, there are no images matching your search query.', {
        autoClose: 5000,
      });
    }
  }, [isError]);

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmitNewSearch} />
      <ImageGallery searchData={searchData} onHandleClickImage={onHandleClickImage} />
      {searchData.length !== 0 && searchData.length < totalHits && (
        <Button onLoadMore={onLoadMore} />
      )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={5000} />
      {dataLargeImage && (
        <Modal dataLargeImage={dataLargeImage} toogleModal={() => setDataLargeImage(null)} />
      )}
    </div>
  );
};

export default App;
