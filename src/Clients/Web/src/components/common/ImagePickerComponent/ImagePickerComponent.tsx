import React, { useState, useRef, useEffect } from 'react';
import './ImagePickerComponent.css';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Divider, Grid, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface ImagePickerComponentProps {
  label?: string;
  fullWidth?: boolean;
  setSelectedImages?: (images: File[] | []) => void;
  setCoverImage?: (image: File | null) => void;
  formik?: any;
}

const ImagePickerComponent = (props: ImagePickerComponentProps) => {
  const theme = useTheme();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedImages.length > 0 && !coverImage) {
      setCoverImage(selectedImages[0]);
      props.setCoverImage && props.setCoverImage(selectedImages[0]);
    }
  }, [selectedImages, coverImage, props]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      toast.dismiss();

      if (selectedImages.length + event.target.files.length > 5) {
        toast.error('En fazla 5 adet resim seçebilirsiniz.');
        return;
      }

      const filesArray = Array.from(event.target.files);
      const fileNames = filesArray.map(file => file.name);
      const existingFileNames = selectedImages.map(file => file.name);
      const hasDuplicate = fileNames.some(fileName => existingFileNames.includes(fileName));

      if (hasDuplicate) {
        const duplicateFileName = fileNames.find(fileName => existingFileNames.includes(fileName));
        toast.error(`"${duplicateFileName}" adlı resim zaten mevcut.`);
        return;
      }

      setSelectedImages(prevImages => [...prevImages, ...filesArray]);
      props.setSelectedImages && props.setSelectedImages([...selectedImages, ...filesArray]);
      props.formik && props.formik.setFieldValue('images', [...selectedImages, ...filesArray]);
      if (!coverImage) {
        setCoverImage(filesArray[0]);
        props.setCoverImage && props.setCoverImage(filesArray[0]);
      }
    }
  };

  const handleCoverImageChange = (index: number) => {
    setCoverImage(selectedImages[index]);
    props.setCoverImage && props.setCoverImage(selectedImages[index]);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    props.setSelectedImages && props.setSelectedImages(updatedImages);
    props.formik && props.formik.setFieldValue('images', updatedImages);

    if (coverImage === selectedImages[index]) {
      setCoverImage(updatedImages.length > 0 ? updatedImages[0] : null);
      props.setCoverImage && props.setCoverImage(updatedImages.length > 0 ? updatedImages[0] : null);
      props.formik && props.formik.setFieldValue('coverImage', updatedImages.length > 0 ? updatedImages[0] : null);
    }
  };


  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        fullWidth={props.fullWidth || true}
        style={{
          borderRadius: '1rem',
          marginBottom: '1rem',
        }}
      >
        {props.label || 'RESİM SEÇ'}
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
          accept=".png, .jpg, .jpeg"
        />
      </Button>
      {selectedImages.length > 0 && <Divider style={{ marginBottom: '1rem' }} />}
      {selectedImages.length > 0 &&
        <div ref={containerRef} style={{ paddingTop: "1rem", paddingBottom: "1rem", overflowX: 'auto', maxHeight: "25rem" }}>

          <div >
            {selectedImages.map((image, index) => (
              <div key={index} >
                <Grid container spacing={2} style={{
                  borderBottom: index === selectedImages.length - 1 ? 'none' : `.15rem solid ${theme.palette.primary.main}`,
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                }}>
                  <Grid item xs={12} sm={6} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img src={URL.createObjectURL(image)} alt="" style={{ maxWidth: '20rem', maxHeight: '20rem', width: 'auto', height: 'auto' }} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={coverImage === image}
                          onChange={() => handleCoverImageChange(index)}
                          value={index}
                          name="cover-image"
                          color="primary"
                        />
                      }
                      label="Kapak Resmi"

                    />
                    <IconButton disableRipple onClick={() => handleDeleteImage(index)} style={{
                      color: theme.palette.error.main,
                      cursor: 'pointer',

                    }}>
                      <DeleteForeverIcon />
                      Sil
                    </IconButton>
                  </Grid>
                </Grid>

              </div>
            ))}
          </div>
        </div>}

    </>
  );
};

export default ImagePickerComponent;
