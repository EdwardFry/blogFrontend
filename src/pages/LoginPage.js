import { Container, Paper, Button, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, theme } from '@material-ui/core/styles';

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
    return (
        <div className={classes.root}>
            <Paper elevation={8} className={classes.loginCard}>
                <Typography className={classes.title}>Login</Typography>
                <form className={classes.textFieldContainer}>
                    <TextField
                        className={classes.textField}
                        label="username"
                        InputProps={{
                            classes: {
                                input: classes.textField,
                            },
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label="password"
                        type="password"
                        InputProps={{
                            classes: {
                                input: classes.textField,
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Login
                    </Button>
                </form>
            </Paper >
        </div >
    );
}

export default LoginPage;