import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: 100,
            justifyContent: 'center',
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
            fontSize: 25,
            marginLeft: 100
        }
    }),
);

const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <p className={classes.brand}>Edward's UROP blog | Edel group</p>
                <Typography><Link className={classes.link} to="/" >About</Link></Typography>
                <Typography><Link className={classes.link} to="/posts" >Posts</Link></Typography>
                <Typography><Link className={classes.link} to="/create" >Create Post</Link></Typography>
                <Typography><Link className={classes.link} to="/login" >Login</Link></Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
