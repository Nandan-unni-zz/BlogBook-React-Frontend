import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

// Features
import Home from "./Pages/Features/Home";
import Feed from "./Pages/Features/Feed";
import Message from "./Pages/Features/Message";
import Search from "./Pages/Features/Search";

// Accounts
import CreateAccount from './Pages/Accounts/CreateAccount';
import LoginAccount from './Pages/Accounts/LoginAccount';
import ViewAccount from './Pages/Accounts/ViewAccount';
import EditAccount from './Pages/Accounts/EditAccount';
import DeleteAccount from './Pages/Accounts/DeleteAccount';

// Blogs
import CreateBlog from './Pages/Blogs/CreateBlog';
import ViewBlog from './Pages/Blogs/ViewBlog';
import EditBlog from './Pages/Blogs/EditBlog';
import DeleteBlog from './Pages/Blogs/DeleteBlog';

function App() {
  return (
    <div className="Keyblogs">
      <BrowserRouter>
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/feed/" component={Feed} />
          <Route path="/message/" component={Message} />
          <Route path="/search/" component={Search} />

          <Route path="/account/create/" component={CreateAccount} />
          <Route path="/account/login/" component={LoginAccount} />
          <Route path="/account/view/" component={ViewAccount} />
          <Route path="/account/edit/" component={EditAccount} />
          <Route path="/account/delete/" component={DeleteAccount} />

          <Route path="/blog/create/" component={CreateBlog} />
          <Route path="/blog/view/" component={ViewBlog} />
          <Route path="/blog/edit/" component={EditBlog} />
          <Route path="/blog/delete/" component={DeleteBlog} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
