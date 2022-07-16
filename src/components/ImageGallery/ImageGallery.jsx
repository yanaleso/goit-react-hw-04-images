import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = forwardRef(({ images, onImageClick }, ref) => (
        <Gallery ref={ref}>
            {images.map(({ id, webformatURL, tags }, index) => (
              <ImageGalleryItem key={id} imgUrl={webformatURL} tags={tags} index={index} onImageClick={onImageClick} />
                ))}
        </Gallery>
    ))


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
}


export default ImageGallery;