import React, { useEffect, useState } from 'react';
import './AddNewProductPage.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { CustomTextFieldComponent } from '../../../../components/common/CustomTextFieldComponent';
import { CustomTextAreaComponent } from '../../../../components/common/CustomTextAreaComponent';
import { ImagePickerComponent } from '../../../../components/common/ImagePickerComponent';
import BrandService from '../../../../services/brand.service';
import { BrandListDto } from '../../../../dtos/brands/brandListDto';
import { CategoryListDto } from '../../../../dtos/categories/categoryListDto';
import CategoryService from '../../../../services/category.service';
import { FeatureDto } from '../../../../dtos/features/featureDto';
import FeatureService from '../../../../services/feature.service';
import ProductService from '../../../../services/product.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({
  name: Yup.string().required('Ürün adı zorunludur'),
  price: Yup.number().required('Ürün fiyatı zorunludur').notOneOf([0], 'Ürün fiyatı 0 olamaz'),
  description: Yup.string().required('Ürün açıklaması zorunludur'),
  unitsInStock: Yup.number().required('Stok adedi zorunludur').notOneOf([0], 'Stok adedi 0 olamaz'),
  brandId: Yup.string().required('Marka zorunludur'),
  categoryIds: Yup.array().of(Yup.string()).required('Kategori zorunludur').min(1, 'En az 1 kategori seçiniz'),
  featureValueIds: Yup.array().of(Yup.string()).required('Özellik zorunludur'),
  images: Yup.array()
    .of(Yup.mixed().test('fileType', 'Resim zorunludur', value => value instanceof File)).required('Resim zorunludur')
    .required('Resim zorunludur')
    .min(1, 'En az 1 resim yükleyiniz')
});

const sxValues = {
  p: 2,
  m: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};


const AddNewProductPage = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryListDto[]>();
  const [selectedCategoriesFeatures, setSelectedCategoriesFeatures] = useState<FeatureDto[]>();
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const [selectedFeatureValueIds, setSelectedFeatureValueIds] = useState<number[]>([]);

  const [brands, setBrands] = useState<BrandListDto[]>();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      unitsInStock: 0,
      description: '',
      brandId: '',
      categoryIds: [] as number[],
      featureValueIds: [] as number[],
      images: selectedImages,
      coverImage: coverImage
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitted(true);
      if (!selectedFeatureValueIds || selectedFeatureValueIds.length !== (selectedCategoriesFeatures?.length ?? 0)){
        return;
      }

      if (values.images?.includes(values.coverImage as File)) {
        values.images = values.images?.filter((image) => image !== values.coverImage);
      }

      console.log(values);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price.toString());
      formData.append('description', values.description);
      formData.append('brandId', values.brandId);
      formData.append('unitsInStock', values.unitsInStock.toString());
      values.categoryIds.forEach((categoryId) => {
        formData.append('categoryIds', categoryId.toString());
      });
      values.featureValueIds.forEach((featureValueId) => {
        formData.append('featureValueIds', featureValueId.toString());
      });
      values.images?.forEach((image) => {
        formData.append('images', image,image.name);
      });
      formData.append('coverImage', values.coverImage as File, values.coverImage?.name);
      console.log(formData);
      await addProduct(formData);
    },
  });

  const addProduct =async (formData:FormData)=>{
    await ProductService.addProduct(formData)
    .then((response)=>{
      console.log(response.data);
      toast.success('Ürün başarıyla eklendi');
      navigate('/user/products');
    })
    .catch((error)=>{
      console.log(error);
      toast.error('Ürün eklenirken bir hata oluştu');
    })
  }


  const getBrands = async () => {
    setLoading(true);
    await BrandService.getBrands()
      .then((response) => {
        const data = response.data.data!;
        data.sort((a, b) => a.name.localeCompare(b.name));
        setBrands(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getCategories = async () => {
    setLoading(true);
    await CategoryService.getCategories()
      .then((response) => {
        const data = response.data.data!;

        data.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getFeaturesByIds = async (ids: number[]) => {
    setLoading(true);
    await FeatureService.getByIds(ids)
      .then((response) => {
        const data = response.data.data!;
        setSelectedCategoriesFeatures(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getBrands();
    getCategories();
  }, []);

  useEffect(() => {
    if (formik.values.categoryIds.length > 0) {
      setSelectedCategoriesFeatures(undefined);
      const selectedCategories = categories?.filter((category) => formik.values.categoryIds.includes(category.id));

      const selectedCategoryIds = selectedCategories?.map((category) => category.id);
      const parentCategoryIds: number[] = []
      selectedCategories?.forEach(category => {
        if (category.parentCategoryId !== null && !parentCategoryIds.includes(category.parentCategoryId))
          parentCategoryIds.push(category.parentCategoryId);
      });

      parentCategoryIds?.forEach(id => {
        if (!selectedCategoryIds?.includes(id))
          selectedCategoryIds?.push(id);
      });

      const selectedFeatureIds: number[] = [];
      if (categories && selectedCategoryIds) {
        const filteredCategories = categories.filter((category) => selectedCategoryIds.includes(category.id));

        filteredCategories.forEach((category) => {
          const categoryFeatures = category.features.flat();

          categoryFeatures.forEach((feature) => {
            selectedFeatureIds.push(feature.id);
          });
        });
      }

      selectedFeatureIds && getFeaturesByIds(selectedFeatureIds);
    }
  }, [categories, formik.values.categoryIds]);

  useEffect(() => {
    formik.setFieldValue('featureValueIds', selectedFeatureValueIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFeatureValueIds]);

  useEffect(() => {
    formik.setFieldValue('coverImage', coverImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverImage])

  useEffect(() => {
    if (formik.values.categoryIds.length === 0) {
      setSelectedCategoriesFeatures(undefined);
    }
  }, [formik.values.categoryIds])

  const handleFeatureValueChange = (e: any, feature: FeatureDto) => {
    const value = parseInt(e.target.value);
    const selectedFeatureValueIdsCopy = [...selectedFeatureValueIds];
    const existingValueIndex = selectedFeatureValueIds.indexOf(value);

    if (existingValueIndex === -1) {
      const existingValueInSameCategory = feature.values?.find(val => selectedFeatureValueIdsCopy.includes(val.id));
      if (existingValueInSameCategory) {
        const existingValueIndexToRemove = selectedFeatureValueIdsCopy.indexOf(existingValueInSameCategory.id);
        selectedFeatureValueIdsCopy.splice(existingValueIndexToRemove, 1);
      }
      selectedFeatureValueIdsCopy.push(value);
    } else {
      selectedFeatureValueIdsCopy.splice(existingValueIndex, 1);
    }
    console.log(selectedFeatureValueIdsCopy)
    setSelectedFeatureValueIds(selectedFeatureValueIdsCopy);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={10} lg={6} >
        <Paper sx={{ ...sxValues }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <Grid container >
                  <Grid item xs={12} sm={9}>
                    <Typography variant='h4'>Ürünler</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
                    <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                      color="primary" type="submit" onClick={() => console.log(formik.errors)} >
                      Ekle
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <CustomTextFieldComponent formik={formik} fieldName='name' label="Ürün Adı" />
              </Grid>
              <Grid item xs={12} >
                <CustomTextFieldComponent formik={formik} type='number' fieldName='price' label='Ürün Fiyatı' />
              </Grid>
              <Grid item xs={12} >
                <CustomTextFieldComponent formik={formik} type='number' fieldName='unitsInStock' label='Stok Miktarı' />
              </Grid>
              {brands && <Grid item xs={12}>
                <InputLabel id="brand">Marka Seçiniz</InputLabel>
                <TextField
                  select
                  fullWidth
                  variant='standard'
                  value={formik.values.brandId}
                  onChange={(e) => formik.setFieldValue('brandId', e.target.value)}
                >
                  <MenuItem disabled value="Marka Seçiniz">Marka Seçiniz</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography variant='caption' color='error'>
                  {formik.errors.brandId}
                </Typography>
              </Grid>}
              {categories && <Grid item xs={12}>
                <InputLabel id="category">Kategori Seçiniz</InputLabel>
                <Select
                  label='Kategori Seçiniz'
                  fullWidth
                  multiple
                  variant='standard'
                  value={formik.values.categoryIds}
                  onChange={(e) => formik.setFieldValue('categoryIds', e.target.value)}
                >
                  <MenuItem disabled value="Kategori Seçiniz">Kategori Seçiniz</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant='caption' color='error'>
                  {formik.errors.categoryIds}
                </Typography>
              </Grid>}
              {selectedCategoriesFeatures && <Grid item xs={12}>
                <InputLabel id="feature">Özellik Seçiniz</InputLabel>
                {!selectedFeatureValueIds || selectedFeatureValueIds.length != selectedCategoriesFeatures.length &&
                  <Typography variant='caption' color='error'>
                    {selectedCategoriesFeatures.length} özelliğin değerlerinden birini seçiniz.
                  </Typography>
                }
                <FormControl fullWidth>
                  {selectedCategoriesFeatures.map((feature) => (
                    <div key={feature.id}>
                      <TextField
                        select
                        label={feature.name}
                        id={feature.name}
                        fullWidth
                        variant='standard'
                        onChange={(e) => handleFeatureValueChange(e, feature)}
                        sx={{ mt: 1 }}
                      >
                        <MenuItem disabled value={feature.name}>{feature.name}</MenuItem>
                        {feature.values && feature.values.map((value) => (
                          <MenuItem key={value.id} value={value.id}>
                            {value.value}
                          </MenuItem>
                        ))}
                        <Typography variant='caption' color='error'>
                          {formik.errors.featureValueIds}
                        </Typography>
                      </TextField>

                    </div>
                  ))}
                </FormControl>
              </Grid>}
              <Grid item xs={12}>
                <CustomTextAreaComponent
                  fieldName='description'
                  formik={formik}
                  label='Ürün Açıklaması'
                />
                <Typography variant='caption' color='error'>
                  {formik.errors.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ImagePickerComponent
                  fullWidth
                  setCoverImage={setCoverImage}
                  setSelectedImages={setSelectedImages}
                  formik={formik}
                />
                <Typography variant='caption' color='error'>
                  {formik.errors.images}
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddNewProductPage;