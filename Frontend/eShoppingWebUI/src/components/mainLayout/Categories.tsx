import { Box, Divider, List, ListItem, ListItemText, Popover, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const categories = [
  {
    id: 1,
    name: 'Telefon',
    subcategories: ['Akıllı Telefon', 'Klasik Telefon', 'Aksesuarlar'],
  },
  {
    id: 2,
    name: 'Bilgisayar',
    subcategories: ['Laptop', 'Masaüstü', 'Oyun Bilgisayarları'],
  },
  {
    id: 3,
    name: 'Bilgisayar Parçaları',
    subcategories: ['RAM', 'GPU', 'CPU', 'Anakart'],
  },
  {
    id: 4,
    name: 'TV & Ses',
    subcategories: ['Televizyon', 'Soundbar', 'Kulaklık'],
  },
  {
    id: 5,
    name: 'Ev Eşyaları',
    subcategories: ['Buzdolabı', 'Çamaşır Makinesi', 'Fırın'],
  },
  {
    id: 6,
    name: 'Kişisel Bakım',
    subcategories: ['Saç Kurutma Makinesi', 'Diş Fırçası', 'Elektrikli Tıraş Makinesi'],
  },
];


function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </Typography>
  );
}


const Categories = () => {
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
    <div>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              value={index}
              label={category.name}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(e) => handlePopoverOpen(e, index)}
              onMouseLeave={handlePopoverClose}
              onClick={() => navigate(`/category/${category.id}`)}
              onMouseOver={(e) => e.currentTarget.style.borderBottom = `.2rem solid ${theme.palette.primary.main}`}
              onMouseOut={(e) => e.currentTarget.style.borderBottom = 'none'}
            />
          ))}
        </Tabs>
      </Box>
      {categories.map((category, index) => (
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
            {category.subcategories.map((subcategory, subIndex) => (
              <ListItem key={subIndex} disablePadding sx={{ p: 1 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'inherit'}
              >
                <ListItemText primary={subcategory} />

              </ListItem>
            ))}
          </List>
        </Popover>
      ))}

    </div>
  );
}

export default Categories