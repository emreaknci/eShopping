import React, { useEffect, useState } from 'react'
import { CategoryListDto } from '../../../dtos/categories/categoryListDto';
import CategoryService from '../../../services/category.service';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';
import { FeatureValueDto } from '../../../dtos/features/featureValueDto';
import { BrandListDto } from '../../../dtos/brands/brandListDto';
import { ProductFilterOptions, SortType } from '../../../dtos/products/productFilterOptions';
import { FeatureDto } from '../../../dtos/features/featureDto';

export interface FilterBoxProps {
    initialFilters: ProductFilterOptions;
    filters: ProductFilterOptions;
    setFilters: any;
    searchQuery: string;
    setSearchQuery: any;

}

const FilterBox = (props: FilterBoxProps) => {
    const [categories, setCategories] = useState<CategoryListDto[] | null>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(null);

    const getCategories = () => {
        CategoryService.getCategories().then((response) => {
            const data = response.data.data as CategoryListDto[];
            setCategories(data);
        }).catch((error) => {
            console.error(error);
            setCategories(null);
        });
    }

    useEffect(() => {
        getCategories();

        if (selectedCategoryId) {
            const initalFilters = { ...props.initialFilters, categoryIds: [Number(selectedCategoryId)] }
            props.setFilters(initalFilters);
        }
    }, [selectedCategoryId]);


    const handleSearchQuery = (e: any) => {
        props.setSearchQuery(e.target.value);
    }

    const handleCategoryChange = (e: any) => {
        setSelectedCategoryId(e.target.value);
    };

    return (
        <Box p={2}>
            <FormControl variant="outlined" size="small" sx={{ m: 1 }}>
                <TextField
                    label="Ara"
                    variant="outlined"
                    size="small"
                    value={props.searchQuery}
                    onChange={handleSearchQuery}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ m: 1 }}>
                <Select
                    label='Kategori Seçiniz'
                    fullWidth
                    variant='outlined'
                    value={selectedCategoryId ?? 'Kategori Seçiniz'}
                    onChange={handleCategoryChange}
                >
                    <MenuItem disabled value="Kategori Seçiniz">Kategori Seçiniz</MenuItem>
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id.toString()}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </Box>
    )
}


export default FilterBox;