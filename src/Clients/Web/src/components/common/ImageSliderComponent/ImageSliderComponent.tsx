import { useState } from 'react';
import { Box, CardMedia, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import './ImageSliderComponent.css';

const ImageSliderComponent = ({ images }: { images: any }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
  };

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box position="relative">
      <CardMedia
        component="img"
        image={images[currentImage]}
        style={{
          margin: 'auto',
          width: '20rem',
          height: '20rem',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
        onClick={handleNextImage}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        {images.map((image: any, index: number) => (
          <Box key={index} mr={index === images.length - 1 ? 0 : 0.5} ml={index === 0 ? 0 : 0.5}>
            <CardMedia
              component="img"
              image={image}
              style={{
                cursor: 'pointer',
                border: index === currentImage ? '2px solid #B0272F' : 'none',
                width: '3rem',
                height: '3rem',
                maxWidth: '100%',
              }}
              onClick={() => handleImageClick(index)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSliderComponent;
