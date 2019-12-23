import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'

import { Navigation } from './components/Navigation'

import styles from './App.module.css';

const Home = React.lazy(() => import('./pages/Home'))
const Notebooks = React.lazy(() => import('./pages/Notebooks'))
const Notebook = React.lazy(() => import('./pages/Notebook'))
const Stats = React.lazy(() => import('./pages/Stats'))

function App() {
  return (
    <div className={styles.app}>
      <CssBaseline />
      <Router>
        <header>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                HN Search Notebook
              </Typography>
            </Toolbar>
          </AppBar>
        </header>
        <main className={styles.appMain}>
          <React.Suspense fallback={<CircularProgress variant="determinate" />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/notebooks" exact component={Notebooks} />
              <Route path="/notebooks/:id" component={Notebook} />
              <Route path="/stats" exact component={Stats} />
            </Switch>
          </React.Suspense>
        </main>
        <footer className={styles.appFooter}>
          <Navigation />
        </footer>
      </Router>
    </div>
  );
}

export default App;
