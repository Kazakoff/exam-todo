import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio

} from '@mui/material';
import { Link } from 'react-router-dom';
import {  useColorScheme } from '@mui/material/styles';

const Layout = () => {
   const { mode, setMode } = useColorScheme();
     if (!mode) {
    return null;
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Главная
            </Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
              О приложении
            </Link>

        <FormControl>
         <RadioGroup
          aria-labelledby="demo-theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        >
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;