import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { AppBar, Box, Toolbar, Typography, Container, Tooltip } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()

  const handleClickUserAdd = () => navigate('/create')

  return (
    <AppBar position="fixed" style={{ background: '#23395B' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: '#CBF7ED' }}>Home</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: '#CBF7ED' }}>Home</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Add User">
              <IconButton sx={{ p: 0 }} onClick={handleClickUserAdd}>
                <AddIcon style={{ color: '#CBF7ED', fontSize: '40px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar
