import { useState } from 'react';
import { Paper, Button, Typography, Input, FormHelperText  } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            background: 'skyblue',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        },
        loginCard: {
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            height: 400,
            width: 500,
        },
        title: {
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
            fontSize: 30
        },
        textFieldContainer: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
        },
        textField: {
            fontSize: 25
        },
        button: {
            marginTop: 50
        }
    }),
);

const LoginPage = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setShowError] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const postData = () => {
        axios.post('http://localhost:5000/gettoken', {
            data: {
                'username': username,
                'password': password
            }}
            )
          .then(function (response) {
            const userData = response.data;
            localStorage.setItem("userData",
            JSON.stringify({
                token: userData["Access token"]  
            }))
            window.location.href = "posts"
          })
          .catch(function (error) {
            setShowError(true)
          });
    }

    const handleLogin = () => {
        postData()
    }

    return (
        <div className={classes.root}>
            <Paper elevation={8} className={classes.loginCard}>
                <Typography className={classes.title}>Login</Typography>
                {showError && <Alert severity="error">Please enter a correct username and password</Alert>}
                <form className={classes.textFieldContainer} onSubmit={handleLogin}>
                    <Input 
                        id="username-input"
                        className={classes.textField}
                        label="username"
                        placeholder="Username"
                        required={true}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Input 
                        id="password-input"
                        className={classes.textField}
                        placeholder="Password"
                        required={true}
                        label="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <FormHelperText id="my-helper-text">Login to edit posts</FormHelperText>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </form>
            </Paper >
        </div >
    );
}

export default LoginPage;