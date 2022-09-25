import React from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact element={<Main />} />
        <Route path="/repository/:repository" element={<Repository />} />
      </Switch>
  </BrowserRouter>
  );
}
