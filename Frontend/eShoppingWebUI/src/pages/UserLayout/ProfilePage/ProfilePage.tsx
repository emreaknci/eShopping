import Address from '../../../components/userLayout/profilePage/Address';
import UserInformation from '../../../components/userLayout/profilePage/UserInformation';
import './ProfilePage.css';
import { Grid } from '@mui/material';

const sxValues = {
  p: 2,
  m: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  
};






const ProfilePage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <UserInformation sxValues={sxValues} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Address sxValues={sxValues} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
