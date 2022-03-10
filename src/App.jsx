import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './views/Home/Home';
import Synth from './views/Synth/Synth';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/synth">
            <Synth />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
