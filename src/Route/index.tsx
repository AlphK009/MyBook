import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookSearchComponent from '@/app/page';
import BookDetail from '@/pages/bookDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BookSearchComponent} />
        <Route path="/books/:bookId" component={BookDetail} />
      </Switch>
    </Router>
  );
};

export default App;
