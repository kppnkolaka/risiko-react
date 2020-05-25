import React from 'react';
import { Sidebar, Segment } from 'semantic-ui-react';
import Headers from './components/headers';
import Sider from './components/sider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import { SemanticToastContainer } from 'react-semantic-toasts';
import Referensi from './views/referensi/referensi';
import Risiko from './views/risiko/risiko';

function App() {
  return (
    <div>
      <Headers />
      <Sider />
      <Sidebar.Pusher dimmed={false}>
          <Segment stacked>
            <main className="content-right">
              <SemanticToastContainer />
              <Router>
                <Switch>
                  <Route exact path="/referensi" render={ props => <Referensi {...props} /> } />
                  <Route exact path="/risiko" render={ props => <Risiko {...props} /> } />
                </Switch>
              </Router>
            </main>
          </Segment>
        </Sidebar.Pusher>
    </div>
  );
}

export default withRouter(App);
