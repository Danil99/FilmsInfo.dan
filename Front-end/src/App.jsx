import React from 'react';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './components/FilmsContent.jsx';
import About from './components/staticPage/About.jsx';
import ContactsInfo from './components/staticPage/ContactsInfo.jsx';
import NotFound from './components/staticPage/NotFound.jsx';
import FilmSingle from './components/FilmPage.jsx';
import Login from './components/Login.jsx';
import Settings from './components/privatePage/Settings.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <main>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contacts" component={ContactsInfo} />
            {
              Boolean(localStorage.jwtToken) ?
                <Redirect from='/login' to='/'/>
                  :
                    false
            }
            {
              !Boolean(localStorage.jwtToken) ?
                <Redirect from='/settings' to='/'/>
                  :
                    false
            }
            <Route path="/login" component={Login} />
            <Route path="/settings" component={Settings} />
            <Route path="/:title" component={FilmSingle} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App;
