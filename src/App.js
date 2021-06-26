import { createStyles, makeStyles, theme } from '@material-ui/core/styles';

import Navbar from './components/Navbar';

import CreatePostPage from './pages/CreatePostPage';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      background: 'skyblue',
      height: '100vh'
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
  return (
    <Router>
      <div className={classes.root}>
        <Route exact path="/">
          <Navbar />
        </Route>
        <Switch>
          <Route exact path="/posts">
            <Navbar />
            <PostsPage />
          </Route>
          <Route exact path="/create">
            <Navbar />
            <CreatePostPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
        <Footer className={classes.footer} />
      </div>
    </Router>
  );
}

export default App;
