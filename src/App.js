import { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";
import Navbar from './components/Navbar';

import CreatePostPage from './pages/CreatePostPage';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      minHeight: '100vh',
      background: 'skyblue'
    },
    footer: {
      display: 'flex',
      marginLeft: '100',
      marginRight: 'auto'
    }
  }),
);

const App = () => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    if (userData && userData.token && jwt_decode(userData.token).exp > Date.now() / 1000) {
      setLoggedIn(true)
    }
  }, [])
  return (
    <Router>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/posts">
            <Navbar loggedIn={loggedIn}/>
            <PostsPage />
          </Route>
          <Route exact path={"/post/:id"}>
            <Navbar loggedIn={loggedIn}/>
            <PostPage loggedIn={loggedIn}/>
          </Route>
          <Route path={"/post"}>
            <Redirect to="/posts"/>
          </Route>
          <Route path={"/post/"}>
            <Redirect to="/posts"/>
          </Route>
          {loggedIn &&
          <Route exact path="/create">
            <Navbar loggedIn={loggedIn}/>
            <CreatePostPage />
          </Route>
          }
          {!loggedIn &&
          <Route exact path="/login">
            <LoginPage />
          </Route>
          }
          <Route path="/">
            <Redirect to="/posts"/>
          </Route>
        </Switch>
        <Footer className={classes.footer} />
      </div>
    </Router>
  );
}

export default App;
