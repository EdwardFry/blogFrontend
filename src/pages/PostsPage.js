import { useState, useEffect, Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Card, Container } from '@material-ui/core';
import axios from 'axios';
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: 100,
        },
        paper: {
            padding: '40px 60px',
            minHeight: '80vh'
        },
        weekCard: {
            padding: 10,
            float: 'left',
            width: 300,
            height: 300,
            margin: 20,
            background: 'white',
            backgroundSize: 'cover',
            '&:hover': {
                transform: 'scale(1.01)'
            }
        },
        title: {
        }
    }),
);

const PostsPage = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([])
    const [loadingState, setLoadingState] = useState(true)

    const getPosts = () => {
        axios.get('https://uropblogbackend.herokuapp.com/getposts')
            .then(function (response) {
            setPosts(response.data)
            setLoadingState(false)
             })
            .catch(function (error) {
            })
    }

    useEffect(() => {
        getPosts()
    }, [])

    const skeletonContent = 
        <Fragment>
                <Card 
                    elevation={3} 
                    className={classes.weekCard}
                >
                <Typography variant="h5" className={classes.title}><Skeleton /></Typography>
                        <Skeleton />
                </Card>
                <Card 
                    elevation={3} 
                    className={classes.weekCard}
                >
                <Typography variant="h5" className={classes.title}><Skeleton /></Typography>
                        <Skeleton />
                </Card>
                <Card 
                    elevation={3} 
                    className={classes.weekCard}
                >
                <Typography variant="h5" className={classes.title}><Skeleton /></Typography>
                        <Skeleton />
                </Card>
                <Card 
                    elevation={3} 
                    className={classes.weekCard}
                >
                <Typography variant="h5" className={classes.title}><Skeleton /></Typography>
                        <Skeleton />
                </Card>
                <Card 
                    elevation={3} 
                    className={classes.weekCard}
                >
                <Typography variant="h5" className={classes.title}><Skeleton /></Typography>
                        <Skeleton />
                </Card>
                <Card 
                    elevation={3} 
                    className={classes.weekCard}
                >
                <Typography variant="h5" className={classes.title}><Skeleton /></Typography>
                        <Skeleton />
                </Card>
        </Fragment>

    const content = 
        <Fragment>
            {posts.map(post => (
                <Link to={`/post/${post.post_id}`} key={`post_${post.post_id}`}>
                    <Card 
                        elevation={3} 
                        className={classes.weekCard}
                    >
                    <Typography variant="h5" className={classes.title}>{post.title}</Typography>
                    {post.date_created}
                    </Card>
                </Link>
            ))}
        </Fragment>

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
            <Typography variant="h4">Posts</Typography>
            {loadingState? skeletonContent: content}
            </Paper>
        </Container>
    )
}

export default PostsPage;