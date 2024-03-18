import React, { useContext, useEffect, useState } from 'react';
import './AdminsPage.css';
import { createFakeUser } from '../../../mock/users';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import { DialogComponent } from '../../../components/common/DialogComponent';
import { SnackBarContext } from '../../../contexts/SnackBarContext';

const AdminsPage = () => {
  const [admins, setAdmins] = useState(createFakeUser(10, true));
  const [filteredAdmins, setFilteredAdmins] = useState(admins);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentUser, setCurrentUser] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const snackbarContext = useContext(SnackBarContext);

  useEffect(() => {
    const filteredAdmins = admins.filter((admin) => {
      const emailMatch = admin.email.toLowerCase().includes(searchText.toLowerCase());
      const idMatch = admin.id.toString().includes(searchText);
      const phoneMatch = admin.phone.includes(searchText);
      const fullnameMatch = admin.fullName.toLowerCase().includes(searchText.toLowerCase());
      return emailMatch || idMatch || phoneMatch || fullnameMatch;
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

  const handleRevokeAuth = (user: any) => {
    setOpenAlert(true);
    setAlertText(`'${user.fullName}' kullanıcısının yetkisini almak istediğinize emin misiniz?`);
    setCurrentUser(user);
  }

  const handleConfirm = () => {
    setAdmins(admins.filter((admin) => admin.id !== currentUser.id));
    setOpenAlert(false);
    snackbarContext.openSnackBar(`'${currentUser.fullName}' kullanıcısından yetki alındı.`, 'success');
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant='h4'>Adminler</Typography>
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
                <TableCell>Phone</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary"
                      onClick={() => handleRevokeAuth(user)}
                      style={{ borderRadius: "5rem" }}
                    >
                      YETKİYİ AL
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredAdmins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
      {openAlert && (
        <DialogComponent
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={() => handleConfirm()}
          text={alertText}
        />
      )}
    </Grid>
  );
};

export default AdminsPage;