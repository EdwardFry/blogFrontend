import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            background: 'white',
            marginTop: 200,
            height: 80
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 30
        }
    }),
);

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Typography>Edward's UROP blog <a href="https://www.imperial.ac.uk/edel-group">Edel Group</a> @Imperial College London</Typography>
            </Container>
        </div>
    );
}

export default Footer;