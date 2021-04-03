//sign in page material ui imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './SignInBox.css';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0),
      
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor:'#e6b3ae',
    },
    form: {
      width: '90%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 1),
    },
  }));
  
  const style = {
    color: '#f5f5f5',
  };

  const text = {
    color: '#525252',
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#e6b3ae',
      },
      secondary: {
        main: '#858585',
      },
    },
  });
  
  export default function SignIn(props) {

    const classes = useStyles();
    
    return (
      <ThemeProvider theme= {theme}>
      <Container className= "boxColor" component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={text}>
            Sign In
          </Typography>
          <form onSubmit={props.handleLogin} className={classes.form} noValidate>
            <TextField
              className = "textField-setup"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              aria-label="Email Address"
              name="email"
              inputProps={{
                'data-testid': 'email'
              }}
              type= "text"
              autoFocus

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              aria-label="Password"
              inputProps={{
                'data-testid': 'password'
              }}
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color= "primary"
              aria-label="submit"
              className={classes.submit}
              style={style}
            >
              Sign In
            </Button>
            <Grid container>
            <div className = "signUpTextLayout" variant="body2" style={text}>
                Don't have an Account?
            </div>
             <Link to = "/signup" className = "signUpHyperlink" variant="body2"> Sign Up</Link>
            </Grid>
          </form>
        </div>
      </Container>
      </ThemeProvider>
    );
  }

 