
import React, { useState } from 'react';
import { Editor as TextEditor} from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import { Container, Paper, Button, TextField, Typography } from '@material-ui/core';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            marginTop: 100
        },
        paper: {
            padding: '40px 60px',
            paddingBottom: 100
        },
        header: {

        },
        title: {
            width: '80%',
            margin: '20px 0'
        },
        textBox: {
            border: "2px solid lightgrey"
        },
        editorBox: {
            padding: 20
        },
        button: {
            marginTop: 50, 
            height: 80,
            fontSize: 18,
            width: 200,
            marginRight: 20
        }
    }),
);

const CreatePostPage = () => {
    const classes = useStyles();
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )
    const [title, setTitle] = useState("")

    const handleEditorChange = (state) => {
        setEditorState(state);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const postData = () => {
        const token = JSON.parse(localStorage.getItem("userData")).token
        const raw = convertToRaw(editorState.getCurrentContent())
        axios.post('https://uropblogbackend.herokuapp.com/post', {
            headers: {
                'x-access-token': `${token}`
            },
            data: {
                'title': title,
                'raw': raw
            }
        })
          .then(function (response) {
            window.location.href=`/post/${response.data.post_id}`
          })
          .catch(function (error) {
          });
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <Typography variant="h4">Create a post</Typography>
                    <p>Today's date: 16th </p>
                </div>
                <Container>
                    <TextField 
                        variant="outlined" 
                        className={classes.title} 
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                        inputProps={{ maxLength: 120 }}
                        required={true}
                    />
                    {/* <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName={classes.textBox}
                        editorClassName="editorClassName"  
                        onChange={handleEditorChange}   
                        readOnly = {true}
                    /> */}
                    <TextEditor 
                        placeholder="Write your post here..."
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName={classes.textBox}
                        editorClassName={classes.editorBox}
                        onEditorStateChange={handleEditorChange}
                    />
                    <Button
                        className={classes.button}
                        variant="outlined"
                        onClick={postData}
                    >
                        Save for later
                    </Button>
                    <Button
                        className={classes.button}
                        
                        variant="outlined"
                    >
                        Publish
                    </Button>
                </Container>
            </Paper>

        </Container >
    );
}

export default CreatePostPage;
