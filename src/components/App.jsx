import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import fetchImages from './API/ImagesApiService';
import { Box } from './Box';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeImg, setActiveImg] = useState(null);
  const [total, setTotal] = useState(0);

  const galleryRef = useRef();

  useEffect(() => {
    async function fetchImageGallery() {
      try {
        if (!searchQuery) {
          return;
        }

        setLoading(true);
        setError(null);
      
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        
        if (hits.length === 0) {
          return toast.warning('Sorry, there are no images matching your search query. Please try again.');
        }
        
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
        
        addImagesToStage(hits, totalHits);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchImageGallery();
  }, [page, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      const { height: cardHeight } = galleryRef.current.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
      })
    }
  });
  
  const addImagesToStage = (hits, totalHits) => {
    setData(prevState => {
      return [...prevState, ...hits];
    });
    setTotal(totalHits);
  };

  const handleError = error => {
    setError( new Error(`Sorry something went wrong. ${error.message}`));
        
    toast.error(`Sorry something went wrong. ${error.message}`);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery.trim());
    setPage(1);
    setData([]);
  };

  const handleImageClick = index => {
    toggleModal();
    return setActiveImg(data[index]);
  };

  const imagesCount = data.length;
   
  return (
    <Box display="grid" grid-template-columns="1fr" grid-gap="16px" pb={4} >
      <Searchbar onSubmit={handleFormSubmit} />

      {loading && <Loader />}

      {error && (<h2 style={{ color: 'orangered', textAlign: 'center' }}>{error.message}</h2>)}

      <ImageGallery ref={galleryRef} images={data} onImageClick={handleImageClick} />

      {imagesCount > 0 && imagesCount < total && <Button onLoadMore={handleLoadMore} />}
        
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={activeImg.largeImageURL} alt={activeImg.tags} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} pauseOnHover />
    </Box>
  );
}