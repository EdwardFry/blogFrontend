import { createStyles, makeStyles, theme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    }),
);

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p>Footer</p>
        </div>
    );
}

export default Footer;