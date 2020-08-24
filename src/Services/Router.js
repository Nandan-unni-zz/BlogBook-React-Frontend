import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";

// Features
import Home from "../Pages/Features/Home";
import Feed from "../Pages/Features/Feed";
import Message from "../Pages/Features/Message";
import Search from "../Pages/Features/Search";

// Accounts
import CreateAccount from '../Pages/Accounts/CreateAccount';
import LoginAccount from '../Pages/Accounts/LoginAccount';
import ViewAccount from '../Pages/Accounts/ViewAccount';
import EditAccount from '../Pages/Accounts/EditAccount';
import DeleteAccount from '../Pages/Accounts/DeleteAccount';

// Blogs
import CreateBlog from '../Pages/Blogs/CreateBlog';
import ViewBlog from '../Pages/Blogs/ViewBlog';
import EditBlog from '../Pages/Blogs/EditBlog';
import DeleteBlog from '../Pages/Blogs/DeleteBlog';

// Components
import NotFound from '../Components/404';

function App() {
  return (
    <div className="Keyblogs">
      <BrowserRouter>
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/feed/" component={Feed} />
          <Route exact path="/message/" component={Message} />
          <Route exact path="/search/" component={Search} />

          <Route exact path="/account/create/" component={CreateAccount} />
          <Route exact path="/account/login/" component={LoginAccount} />
          <Route exact path="/account/view/" component={ViewAccount} />
          <Route exact path="/account/edit/" component={EditAccount} />
          <Route exact path="/account/delete/" component={DeleteAccount} />

          <Route exact path="/blog/create/" component={CreateBlog} />
          <Route exact path="/blog/view/" component={ViewBlog} />
          <Route exact path="/blog/edit/" component={EditBlog} />
          <Route exact path="/blog/delete/" component={DeleteBlog} />

          <Route exact path="*" component={NotFound} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
