import { createStyles, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Container} from '@material-ui/core';

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            height: 80,
            justifyContent: 'space-between',
            background: 'white',
            fontSize: 22
        },
        brand: {
            width: 200,
            color: 'black',
            marginLeft: 50,
            marginRight: 100
        },
        link: {
            textDecoration: 'none',
            color: 'black',
            fontSize: 25
        },
        loginLink: {
            textDecoration: 'none',
            color: 'lightgrey',
            fontSize: 25,
            marginRight: 100,
        }
    }),
);

const Navbar = (props) => {
    const classes = useStyles();
    const handleLogOut = () => {
        localStorage.removeItem("userData")
        window.location.href = "/posts"
    }
    return (
        <AppBar position="static" className={classes.root}>
            <Container>
            <Toolbar className={classes.root}>
                <p className={classes.brand}>Edward's UROP blog <a href="https://www.imperial.ac.uk/edel-group">Edel Group</a></p>
                <Typography><Link className={classes.link} to="/about" >About</Link></Typography>
                <Typography><Link className={classes.link} to="/posts" >Posts</Link></Typography>
                {props.loggedIn && <Typography><Link className={classes.link} to="/create" >Create Post</Link></Typography>}
                {!props.loggedIn && <Typography><Link className={classes.loginLink} to="/login" >Login</Link></Typography>}
                {props.loggedIn && <Typography ><Link className={classes.loginLink} onClick={handleLogOut}>Logout</Link></Typography>}
            </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
