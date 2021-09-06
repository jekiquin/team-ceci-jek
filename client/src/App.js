import { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import StoryPage from './pages/StoryPage/StoryPage';

class App extends Component {
  render() {
    return (
      <>
        <Link to='/'>Home</Link>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/story' exact component={StoryPage} />
          <Route path='/story/:storyId' component={StoryPage} />
        </Switch>
      </>
    );
  }
}

export default App;
