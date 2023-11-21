import { Box, IconButton, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const AdminTopbar = () => {
  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      {/* Search bar */}
      <Box display='flex' borderRadius='3px' sx={{ position: 'relative' }}>
        <TextField label='Search' variant='outlined' size='small' />
        <IconButton type='button' sx={{ p: 1, position: 'absolute', right: 4, top: 0 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display='flex'>
        <Link to='/'>
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default AdminTopbar;
