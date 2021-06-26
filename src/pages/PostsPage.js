import { createStyles, makeStyles, theme } from '@material-ui/core/styles';
import { Typography, Paper, Card, Container } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            marginTop: 100
        },
        paper: {
            padding: '10px 60px'
        }
    }),
);

const PostsPage = () => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Paper elevation={8} className={classes.paper}>
                <Typography>Posts</Typography>
            </Paper>
        </Container>
    )
}

export default PostsPage;