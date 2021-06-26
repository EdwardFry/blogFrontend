
import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container, Paper, Card, Button } from '@material-ui/core';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { createStyles, makeStyles, theme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            marginTop: 100
        },
        paper: {
            padding: '10px 60px'
        },
        header: {

        },
        textBox: {
            border: "1px solid grey"
        }
    }),
);

const CreatePostPage = () => {
    const classes = useStyles();
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState();

    const printState = () => {
        console.log(editorState)
    }

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        const contentHTML = convertToHTML(editorState)
        setConvertedContent(contentHTML)
        console.log(contentHTML)
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <Container className={classes.root}>
            <Paper elevation={8} className={classes.paper}>
                <div className={classes.header}>
                    <h1>Create a post</h1>
                    <p>Today's date: 16th </p>
                </div>

                <Container>
                    <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName={classes.textBox}
                        editorClassName="editorClassName"
                        onEditorStateChange={handleEditorChange}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={printState}
                    >
                        Save for later
                    </Button>
                    <Button color="primary" variant="contained">Publish</Button>
                </Container>
            </Paper>

        </Container >
    );
}

export default CreatePostPage;
