import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import StoreIcon from '@mui/icons-material/Store';

const pages = [{ name: 'Ana Sayfa', link: '/' },
  // { name: 'Products', link: '/products' },
  // { name: 'About', link: '/about' },
  // { name: 'Contact', link: '/contact' }
];

interface MenuItem {
  id: number;
  name: string;
  link?: string;
  onClick?: any;
}

const authenticatedSettings: MenuItem[] = [
  { id: 1, name: 'Profilim', link: '/user/Profile' },
  { id: 2, name: 'Çıkış Yap', onClick: (logout: any) => { logout() } }
]

const unAuthenticatedSettings: MenuItem[] = [
  { id: 3, name: 'Giriş Yap', link: '/login' },
  { id: 4, name: 'Kayıt Ol', link: '/register' }
]

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (link: string) => {
    navigate(link);
    handleCloseUserMenu();
  };

  const handleSettingClick = (setting: any) => {
    if (setting.onClick) {
      if (setting.name == "Çıkış Yap") {
        setting.onClick(authContext.logout);
        toast.success("Çıkış başarıyla yapıldı!");
        return;
      }
    }
    return;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon onClick={() => navigate('/')}
            sx={{
              display: { xs: 'none', md: 'flex' }, mr: 1
              , cursor: "pointer"
            }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            eSHOPPING
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.link);
                }}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <StoreIcon onClick={() => navigate('/')}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: "pointer" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            eSHOPPING
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page.name + index}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.link);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {authContext.isAuthenticated && authContext.isTokenChecked && authContext.isTokenChecked && <IconButton sx={{ ml: 1 }} color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartContext.cartItemCount} color='success' >
              <ShoppingCartOutlinedIcon style={{ color: "white" }} />
            </Badge>
          </IconButton>}

          <IconButton sx={{ mr: 1 }} onClick={themeContext.toggleTheme} color="inherit">
            {themeContext.theme === true
              ? <Brightness7Icon fontSize='medium' style={{ color: "white" }} />
              : <Brightness4Icon fontSize='medium' style={{ color: "white" }} />}
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle fontSize='large' style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {authContext.isAuthenticated && authContext.isTokenChecked && authenticatedSettings.map((setting) => (
                <MenuItem key={setting.name} onClick={() =>
                  setting.onClick
                    ? handleSettingClick(setting)
                    : navigateTo(setting.link!)
                }>
                  <Typography textAlign="center">
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}

              {!authContext.isAuthenticated && authContext.isTokenChecked && unAuthenticatedSettings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => navigateTo(setting.link!)}>
                  <Typography textAlign="center">
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;