import { Box, Button, Divider, List, ListItem, ListItemText, Popover, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CategoryListDto } from '../../dtos/categories/categoryListDto';
import CategoryService from '../../services/category.service';


const Categories = ({categories}:{categories:CategoryListDto[]}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);



  const handlePopoverOpen = (event: any, index: any) => {
    setAnchorEl(event.currentTarget);
    setValue(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);

  return (
    <>
      {categories &&
        <div>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            {categories.filter(c => c.parentCategoryId == null).map((category, index) => (
              <Button key={"category_" + index}
                sx={{
                  m: 1,
                  borderRadius: 1.5,
                  borderBottom: '.2rem solid transparent',
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    borderBottom: '.2rem solid',
                    backgroundColor: 'transparent',

                  },
                }}
                onClick={() => navigate(`/category/${category.id}`)}>
                {category.name}
              </Button>
            ))}
          </Box>
          {categories.filter(c => c.parentCategoryId == null).map((category, index) => (
            <Popover
              key={index}
              id={`mouse-over-popover-${index}`}
              open={open && value === index}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              disableRestoreFocus
              sx={{ pointerEvents: 'none' }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <List>
                {categories.filter(c => c.parentCategoryId != null).map((subcategory, subIndex) => (

                  <div key={"subcategory_" + subIndex} >
                    {category.id == subcategory.parentCategoryId && <ListItem disablePadding sx={{ p: 1 }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0f0f0' }}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
                    >
                      <ListItemText primary={subcategory.name} />
                    </ListItem>}
                  </div>
                ))}
              </List>
            </Popover>
          ))}
        </div>
      }
    </>
  );
}

export default Categories