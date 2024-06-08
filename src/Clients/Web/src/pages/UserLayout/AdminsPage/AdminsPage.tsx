import React, { useContext, useEffect, useState } from 'react';
import './AdminsPage.css';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import { DialogComponent } from '../../../components/common/DialogComponent';
import { toast } from 'react-toastify';
import { UserDto } from '../../../dtos/userDto';
import { Role } from '../../../models/role';
import UserService from '../../../services/user.service';
import { AuthContext } from '../../../contexts/AuthContext';
import { JwtHelper } from '../../../utils/JwtHelper';
import StorageService from '../../../services/storage.service';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth.service';

const AdminsPage = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<UserDto[]>();
  const [filteredAdmins, setFilteredAdmins] = useState(admins);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentUser, setCurrentUser] = useState<UserDto>();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');


  useEffect(() => {
    const getAdmins = async () => {
      await UserService.getAllByRole(Role.Admin)
        .then((res) => {
          const result = res.data;
          setAdmins(result.data!);
          setFilteredAdmins(result.data!);
        })
        .catch((err) => {
          toast.error(err.response.data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
        });
    }
    getAdmins();
  }, []);

  useEffect(() => {
    const filteredAdmins = admins?.filter((admin) => {
      const emailMatch = admin.email?.toLowerCase().includes(searchText.toLowerCase());
      const idMatch = admin.id?.toString().includes(searchText);
      const fullnameMatch = admin.firstName?.toLowerCase().includes(searchText.toLowerCase()) || admin.lastName?.toLowerCase().includes(searchText.toLowerCase());
      return emailMatch || idMatch || fullnameMatch;
    });
    setFilteredAdmins(filteredAdmins);
  }, [admins, searchText]);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  }

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleRevokeAuth = (user: UserDto) => {
    setOpenAlert(true);
    setAlertText(`'${currentUser?.firstName + " " + currentUser?.lastName}' kullanıcısının yetkisini almak istediğinize emin misiniz?`);
    setCurrentUser(user);
  }

  const handleConfirm = async () => {
    await AuthService.revokeAuth(currentUser!.id!)
      .then((res) => {
        setAdmins(admins?.filter((admin) => admin.id !== currentUser?.id));
        setFilteredAdmins(filteredAdmins?.filter((admin) => admin.id !== currentUser?.id));
        toast.success(`'${currentUser?.firstName + " " + currentUser?.lastName}' kullanıcısından yetki alındı.`);
      }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }).finally(() => {
        setOpenAlert(false);
      });


  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Grid container>
          <Grid item xs={12} sm={9}>
            <Typography variant='h4'>Adminler</Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
            <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
              color="primary" onClick={() => navigate("/user/add-new-admin")}>
              Yeni Admin Ekle
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Admin Ara..."
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          size="medium"
          fullWidth
          InputProps={{
            endAdornment: (
              <SearchIcon />
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredAdmins && filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>#{user.id}</TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary"
                      onClick={() => handleRevokeAuth(user)}
                      style={{ borderRadius: "5rem" }}
                      disabled={user.id?.toString() == JwtHelper.getTokenInfos(StorageService.getAccessToken()!).nameidentifier}
                    >
                      YETKİYİ AL
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
          {filteredAdmins && <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredAdmins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />}
        </TableContainer>
      </Grid>
      {openAlert && (
        <DialogComponent
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={async () => await handleConfirm()}
          text={alertText}
        />
      )}
    </Grid>
  );
};

export default AdminsPage;