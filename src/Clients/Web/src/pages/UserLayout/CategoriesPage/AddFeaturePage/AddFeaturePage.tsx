import React, { useEffect, useState } from 'react';
import './AddFeaturePage.css';
import { CustomTextFieldComponent } from '../../../../components/common/CustomTextFieldComponent';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material';
import FeatureService from '../../../../services/feature.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CategoryListDto } from '../../../../dtos/categories/categoryListDto';
import { FeatureDto } from '../../../../dtos/features/featureDto';
import CategoryService from '../../../../services/category.service';
import { Delete } from '@mui/icons-material';

const validationSchema = Yup.object({
  name: Yup.string().required('Bu alan zorunludur'),
  values: Yup.array().of(Yup.string().required('Bu alan zorunludur')),
});

const editValidationSchema = Yup.object({
  id: Yup.string().required('Bu alan zorunludur'),
  newValues: Yup.array().of(Yup.string().required('Bu alan zorunludur')),
});

const sxValues = {
  p: 2,
  m: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const AddFeaturePage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [features, setFeatures] = useState<FeatureDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [editFeature, setEditFeature] = useState(false);

  const getFeatures = async () => {
    await FeatureService.getAll()
      .then((response) => {
        const data = response.data.data!;
        setFeatures(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getFeatures();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      values: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitted(true);

      if (features.map(f => f.name.toLowerCase()).includes(values.name.toLowerCase())) {
        toast.error('Bu isimde bir özellik zaten mevcut');
        return;
      }
      if (values.values.length < 1) {
        toast.error('En az bir değer eklemelisiniz');
        return;
      }
      console.log(values)
      await addFeature();
    },
  });

  const editFormik = useFormik({
    initialValues: {
      id: '',
      newValues: [],
    },
    validationSchema: editValidationSchema,
    onSubmit: async (values) => {
      toast.dismiss();
      setSubmitted(true);

      if(values.newValues.length < 1) {
        toast.error('En az bir değer eklemelisiniz');
        return;
      }

      const validateNewValues = () => {
        let isValid = true;
        const feature = features.filter(f => f.id.toString() == values.id)[0];
        values.newValues.forEach((name: string) => {
          if (feature.values?.map(v => v.value.toLowerCase()).includes(name.toLowerCase())) {
            toast.error(`Bu özelliğin "${name}" adında bir değeri zaten var!`);
            isValid = false;
            return;
          }
        });
        return isValid;
      };
      if (!validateNewValues()) return;
      await addNewValues();
    },
  });

  const addNewValues = async () => {
    setLoading(true);
    await FeatureService.addNewValues({ id: Number(editFormik.values.id), newValues: editFormik.values.newValues })
      .then((response) => {
        toast.success('Değerler başarıyla eklendi');
        getFeatures();
        editFormik.resetForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.data?.message ?? 'Değerler eklenirken bir hata oluştu');
      }).finally(() => {
        setLoading(false);
        setSubmitted(false);
      });
  }



  const addFeature = async () => {
    setLoading(true);
    await FeatureService.add(formik.values)
      .then((response) => {
        toast.success('Özellik başarıyla eklendi');
        setFeatures(response.data.data!);
        formik.resetForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.data?.message ?? 'Özellik eklenirken bir hata oluştu');
      }).finally(() => {
        setLoading(false);
        setSubmitted(false);
      });
  }

  return (
    <Grid container spacing={3} justifyContent="center" >
      <Grid item xs={12} md={10} lg={6} >
        <Paper sx={{ ...sxValues }}>
          <form onSubmit={editFeature ? editFormik.handleSubmit : formik.handleSubmit} >
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <Grid container spacing={3} >
                  <Grid item xs={12} sm={6}>
                    <Typography variant='h4'>Özellikler</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{ pt: { xs: 2, sm: 0 } }}>
                    <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                      color="primary" onClick={() => navigate("/user/add-new-category")}>
                      Kategori Eklemeye Dön
                    </Button>
                  </Grid>

                </Grid>
              </Grid>


              {!editFeature && <>
                <Grid item xs={12} >
                  <CustomTextFieldComponent formik={formik} fieldName='name' label="Özellik Adı" />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} >
                      <InputLabel id="values">Değerler</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                        color="primary"
                        onClick={() => {
                          formik.setFieldValue('values', [...formik.values.values, '']);
                        }}
                      >
                        Yeni Değer Ekle
                      </Button>

                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="textSecondary">
                        {formik.errors.values && formik.errors.values?.length > 0 && formik.touched.values ? (
                          <FormHelperText error>{formik.errors.values}</FormHelperText>
                        ) : (
                          <FormHelperText>
                            En az bir değer eklemelisiniz
                          </FormHelperText>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                  {formik.values.values.map((value, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        fullWidth
                        variant="standard"
                        id={`value-${index}`}
                        label={`Değer ${index + 1}`}
                        name={`values[${index}]`}
                        value={value}
                        sx={{ mt: 1 }}
                        onChange={(e) => {
                          const newValues: string[] = [...formik.values.values];
                          newValues[index] = e.target.value;
                          formik.setFieldValue('values', newValues);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  const newValues: string[] = [...formik.values.values];
                                  newValues.splice(index, 1);
                                  formik.setFieldValue('values', newValues);
                                }}
                              >
                                <Delete />
                              </IconButton>

                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  ))}

                </Grid>
                <Grid item xs={12} sx={{ pt: { xs: 2, sm: 0 } }}>
                  <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                    color="primary" type="submit" >
                    Özellik Ekle
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ pt: { xs: 2, sm: 0 } }}>
                  <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                    color="warning" type="button" onClick={() => setEditFeature(true)}>
                    Mevcut Özelliğe Değer Ekle
                  </Button>
                </Grid>
              </>}


              {editFeature && <>
                <Grid item xs={12} >
                  <InputLabel id="feature">Özellik</InputLabel>
                  <Select
                    fullWidth
                    labelId="feature"
                    id="feature"
                    variant='standard'
                    value={editFormik.values.id}
                    label="Özellik"
                    onChange={(e) => {
                      editFormik.setFieldValue('id', e.target.value as string);
                    }}
                  >
                    {features.map((feature) => (
                      <MenuItem key={feature.id} value={feature.id}>
                        {feature.name}
                      </MenuItem>
                    ))}
                  </Select>

                  <Typography variant="caption" color="textSecondary">
                    {editFormik.errors.id && editFormik.touched.id &&
                      <FormHelperText error>{editFormik.errors.id}</FormHelperText>
                    }
                  </Typography>

                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} >
                      <InputLabel id="values">Değerler</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                        color="primary"
                        onClick={() => {
                          editFormik.setFieldValue('newValues', [...editFormik.values.newValues, '']);
                        }}
                      >
                        Yeni Değer Ekle
                      </Button>

                    </Grid>
                  </Grid>
                  {editFormik.values.newValues.map((value, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        fullWidth
                        variant="standard"
                        id={`value-${index}`}
                        label={`Değer ${index + 1}`}
                        name={`newValues[${index}]`}
                        value={value}
                        sx={{ mt: 1 }}
                        onChange={(e) => {
                          const newValues: string[] = [...editFormik.values.newValues];
                          newValues[index] = e.target.value;
                          editFormik.setFieldValue('newValues', newValues);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  const newValues: string[] = [...editFormik.values.newValues];
                                  newValues.splice(index, 1);
                                  editFormik.setFieldValue('newValues', newValues);
                                }}
                              >
                                <Delete />
                              </IconButton>

                            </InputAdornment>
                          ),
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {editFormik.errors.newValues && editFormik.errors.newValues.length > 0 && editFormik.touched.newValues &&
                          <FormHelperText error>{editFormik.errors.newValues[index]}</FormHelperText>
                        }
                      </Typography>

                    </Grid>
                  ))}
                </Grid>



                <Grid item xs={12} sx={{ pt: { xs: 2, sm: 0 } }}>
                  <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                    color="primary" type="submit" >
                    Güncelle
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ pt: { xs: 2, sm: 0 } }}>
                  <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                    color="warning" type="button" onClick={() => setEditFeature(false)}>
                    Yeni Özellik Ekle
                  </Button>
                </Grid>

              </>}
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid >
  );
};

export default AddFeaturePage;