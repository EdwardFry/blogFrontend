import { useState, useEffect, Fragment } from 'react';
import { Editor as TextEditor} from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Container, Paper, Button, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import Dialog from '@material-ui/core/Dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
        },
        paper: {
            marginTop: 100,
            padding: '50px 100px'
        },
        weekCard: {
            float: 'left',
            width: 300,
            height: 300,
            margin: 20
        },
        button: {
            textDecoration: 'none',
            margin: 0
        },
        spinnerContainer: {
            display: 'flex',
            minHeight: '70vh',
            justifyContent: 'center',
            alignItems: 'center'   
        },
        title: {
            width: '80%',
            margin: '20px 0'
        },
        deleteButton: {
            display: 'flex',
            marginLeft: 'auto',
        },
        dialogBox: {
            padding: 40,
            textAlign: 'center'
        },
        dialogButton: {
            margin: 5,
            marginTop: 20,
            fontSize: 20
        },
        displayNone: {
            display: 'none'
        }
    }),
);

const PostPage = (props) => {
    const classes = useStyles();
    const [post, setPost] = useState(
        {
            'title': "", 
            'raw': ""
        })
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState("")
    const [deleteDialogState, setDeleteDialogState] = useState(false)
    const params = useParams()
    
    const getPost = () => {
        axios.get('https://uropblogbackend.herokuapp.com/getpost', {
            headers: {
                'post_id': params.id
            }
        })
            .then(function (response) {
                setPost(response.data)
                setTitle(response.data.title)
                const content = EditorState.createWithContent(convertFromRaw(response.data.content))
                setEditorState(content)
                setLoading(false)
            })
            .catch(function (error) {
                window.location.href="/posts"
            })
    }

    const updatePost = () => {
        const token = JSON.parse(localStorage.getItem("userData")).token
        const raw = convertToRaw(editorState.getCurrentContent())
        axios.post('https://uropblogbackend.herokuapp.com/update', {
            headers: {
                'x-access-token': `${token}`
            },
            data: {
                'post_id': params.id,
                'title': title,
                'raw': raw
            }
        })
          .then(function (response) {
          })
          .catch(function (error) {
          });
        }

    const deletePost = () => {
        const token = JSON.parse(localStorage.getItem("userData")).token
        axios.delete('https://uropblogbackend.herokuapp.com/delete', 
            {
                data: {
                    'post_id': params.id,
                    'headers': {
                        'x-access-token': `${token}`,
                },
                }
            })
            .then(function (response) {
                window.location.href="/posts"
            })
            .catch(function (error) {
            });
        }   

    useEffect(() => {
        window.scrollTo(0, 0)
        getPost()
    },[])

    const handleEditorChange = (state) => {
        setEditorState(state);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleEditMode = () => {
        setEditing(!editing)
    }

    const handleUpdatePost = () => {
        handleEditMode()
        updatePost()
    }

    const handleDeletePost = () => {
        handleEditMode()
        toggleDeleteDialog()
        deletePost()
    }

    const toggleDeleteDialog = () => {
        setDeleteDialogState(!deleteDialogState)
    }

    const printDocument = () => {
        html2canvas(document.querySelector("#divToPDF")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${title}.pdf`); 
        })
      }

    return (
        <Container className={classes.root}>
            <Dialog 
                aria-labelledby="simple-dialog-title" 
                open={deleteDialogState} 
                className={classes.dialogBox}
            >
                <div className={classes.dialogBox}>
                    <Typography variant="h5">Are you sure you want to permanently delete this post?</Typography>
                    <Button 
                        className={classes.dialogButton} 
                        variant="outlined" color="primary"
                        onClick={handleDeletePost}
                    >
                        Yes
                    </Button>
                    <Button 
                        className={classes.dialogButton} 
                        variant="outlined" 
                        color="secondary" 
                        onClick={toggleDeleteDialog}
                    >
                        No
                    </Button>
                </div>
            </Dialog>
            <Paper className={classes.paper}>
                <Link className={classes.button} to="/posts">
                    <Button variant="outlined">Go To Posts</Button>
                </Link>
                {!editing ? 
                    <Fragment>
                        {props.loggedIn &&<Button variant="outlined" onClick={handleEditMode}>Edit Post</Button>} 
                        <Button variant="outlined" onClick={printDocument}>Download PDF</Button> 
                    </Fragment>
                    : 
                    <Fragment>
                        <Button className={classes.button} variant="outlined" onClick={handleUpdatePost}>Save Changes</Button>
                        <Button className={classes.deleteButton} variant="outlined" color="secondary" onClick={toggleDeleteDialog}>Delete</Button>
                    </Fragment>
                }
                <div id="divToPDF">
                {!editing ? 
                    <h1>{title}{loading? <Skeleton />: <Fragment></Fragment>}</h1>
                    :
                    <TextField 
                        variant="outlined" 
                        className={classes.title} 
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                        inputProps={{ maxLength: 120 }}
                    />
                }
                <br/>
                {loading && 
                    <div>
                        <br/>
                        <Skeleton width="40%"/>
                        <Skeleton count={10}/>
                        <Skeleton width="70%"/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Skeleton width="40%"/>
                        <Skeleton count={10}/>
                    </div> 
                }
                {!editing? <TextEditor
                    editorState={editorState}
                    toolbarClassName={classes.displayNone}
                    wrapperClassName={classes.textBox}
                    editorClassName="editorClassName"  
                    readOnly = {true}
                    />
                :
                <TextEditor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName={classes.textBox}
                    editorClassName="editorClassName"  
                    onEditorStateChange={handleEditorChange}
                />
                }   
                <br/>
                <br/>
                <br/>
                <Typography>{post.date_created || <Skeleton></Skeleton>}</Typography>
                {editing && <Button variant="outlined" onClick={handleUpdatePost}>Save Changes</Button>}
                </div>
            </Paper>
        </Container>
    )
}

export default PostPage