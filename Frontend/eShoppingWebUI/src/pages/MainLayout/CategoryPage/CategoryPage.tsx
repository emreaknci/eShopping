import React, { useEffect, useState } from 'react';
import './CategoryPage.css';
import { useParams } from 'react-router-dom';
import styles from '../../../styles';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Close from '@mui/icons-material/Close';
import ExpandMore from '@mui/icons-material/ExpandMore';
import categories from '../../../mock/category';
import { ProductCardComponent } from '../../../components/common/ProductCardComponent';
import { LoadingComponent } from '../../../components/common/LoadingComponent';


const FilterAccordion = ({ feature }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id={`panel1a-header_${feature.id}`}
        >
          <Typography fontWeight={"bold"}>{feature.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {feature.values.map((value, index) => (

              <FormControlLabel key={index} control={<Checkbox />} label={value} />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const ProductListSection = ({ category }: { category: any }) => {
  return (
    <Grid container spacing={2}>
      {
        category.products.map((product: any, index: number) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}  >
            <ProductCardComponent product={product} />
          </Grid>
        ))
      }
    </Grid>
  );
};

const CategoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const [category, setCategory] = useState<any>();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      const selectedCategory = categories.find(cat => cat.id == id);
      if (selectedCategory) {
        setCategory(selectedCategory);
        setIsLoading(false);
      }
    }, 500);
  }, [id]);


  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [selectedValue, setSelectedValue] = useState('default');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      {isLoading ? <LoadingComponent /> :
        <Box sx={styles.mainBoxPadding}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <h2>{category.name}</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <FormControl fullWidth size="medium">
                <InputLabel >Sırala</InputLabel>
                <Select
                  label="sortBy"
                  value={selectedValue}
                  onChange={handleChange}

                >
                  <MenuItem value="default">Varsayılan</MenuItem>
                  <MenuItem value="descPrice">Fiyata Göre Artan</MenuItem>
                  <MenuItem value="incPrice">Fiyata Göre Azalan</MenuItem>
                  <MenuItem value="newToOld">Yeniden Eskiye</MenuItem>
                  <MenuItem value="oldToNew">Eskiden Yeniye</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              {category.features.map((feature, index) => (
                <div key={index}>
                  <FilterAccordion feature={feature} />
                </div>
              ))}
            </Grid>
            <Grid item xs={12} lg={9}>
              <ProductListSection category={category} />
            </Grid>
          </Grid>
        </Box>
      }
    </>
  );
};

export default CategoryPage;
