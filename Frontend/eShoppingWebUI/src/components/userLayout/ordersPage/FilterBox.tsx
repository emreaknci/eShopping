import React from 'react'
import { OrderStatus, OrderStatusStrings } from '../../../enums/orderStatus';
import { Box, TextField, InputAdornment, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';


export interface FilterBoxProps {
    searchQuery: any;
    handleSearchQuery: any;
    filterStatus: any;
    setFilterStatus: any;

}

const FilterBox = (props: FilterBoxProps) => {
    const orderStatusKeys = Object.keys(OrderStatus).filter(key => isNaN(Number(key)));

    return (
        <Box p={2}>
            <TextField
                label="Ara"
                variant="outlined"
                size="small"
                value={props.searchQuery}
                onChange={props.handleSearchQuery}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                    
                }}
            />
            <FormControl variant="outlined" size="small" style={{ marginLeft: 10 }}>
                <Select
                    value={props.filterStatus}
                    onChange={(e) => props.setFilterStatus(e.target.value)}
                >
                    <MenuItem value="All">Hepsi</MenuItem>
                    {orderStatusKeys.map(statusKey => (
                        <MenuItem key={OrderStatus[statusKey]} value={OrderStatus[statusKey]}>
                            {OrderStatusStrings[OrderStatus[statusKey]]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterBox