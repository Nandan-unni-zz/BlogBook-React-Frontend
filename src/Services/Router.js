import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Features
import Home from "../Pages/Features/Home";
import Login from '../Pages/Features/Login';
import Feed from "../Pages/Features/Feed";
import Message from "../Pages/Features/Message";
import Search from "../Pages/Features/Search";

// Accounts
import CreateAccount from '../Pages/Accounts/CreateAccount';
import SetupAccount from '../Pages/Accounts/SetupAccount';
import ViewAccount from '../Pages/Accounts/ViewAccount';
import EditAccount from '../Pages/Accounts/EditAccount';
import DeleteAccount from '../Pages/Accounts/DeleteAccount';

// Blogs
import CreateBlog from '../Pages/Blogs/CreateBlog';
import ViewBlog from '../Pages/Blogs/ViewBlog';
import EditBlog from '../Pages/Blogs/EditBlog';
import DeleteBlog from '../Pages/Blogs/DeleteBlog';

// Components
import NotFound from '../Pages/Middlewares/NotFound';
import SuccessPage from '../Pages/Middlewares/SuccessPage'
import InvalidPage from '../Pages/Middlewares/InvalidPage';

function App() {
  return (
    <div className="Keyblogs">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/logout/" component={Home} />
          <Route exact path="/feed/" component={Feed} />
          <Route exact path="/message/" component={Message} />
          <Route exact path="/search/" component={Search} />

          <Route exact path="/writer/create/" component={CreateAccount} />
          <Route exact path="/writer/setup/:username" component={SetupAccount} />
          <Route exact path="/writer/view/:username" component={ViewAccount} />
          <Route exact path="/writer/edit/:username" component={EditAccount} />
          <Route exact path="/writer/delete/:username" component={DeleteAccount} />

          <Route exact path="/blog/create/" component={CreateBlog} />
          <Route exact path="/blog/view/:pk" component={ViewBlog} />
          <Route exact path="/blog/edit/:pk" component={EditBlog} />
          <Route exact path="/blog/delete/:pk" component={DeleteBlog} />

          <Route exact path="/success/" component={SuccessPage} />
          <Route exact path="/invalid/" component={InvalidPage} /> 
          <Route exact path="*" component={NotFound} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
