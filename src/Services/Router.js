import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Features
import Home from "../Pages/Features/Home";
import Feed from "../Pages/Features/Feed";
import Search from "../Pages/Features/Search";

// Writers
import CreateWriter from '../Pages/Writers/CreateWriter';
import LoginWriter from '../Pages/Writers/LoginWriter';
import SetupWriter from '../Pages/Writers/SetupWriter';
import ViewWriter from '../Pages/Writers/ViewWriter';
import UpdateWriter from '../Pages/Writers/UpdateWriter';
import DeleteWriter from '../Pages/Writers/DeleteWriter';

// Blogs
import CreateBlog from '../Pages/Blogs/CreateBlog';
import ViewBlog from '../Pages/Blogs/ViewBlog';
import UpdateBlog from '../Pages/Blogs/UpdateBlog';
import DeleteBlog from '../Pages/Blogs/DeleteBlog';

// Middlewares
import NotFound from '../Pages/Middlewares/NotFound';
import SuccessPage from '../Pages/Middlewares/SuccessPage'
import InvalidPage from '../Pages/Middlewares/InvalidPage';

function App() {
  return (
    <div className="Keyblogs">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/feed/" component={Feed} />
          <Route exact path="/search/" component={Search} />

          <Route exact path="/login/" component={LoginWriter} />
          <Route exact path="/logout/" component={Home} />
          <Route exact path="/writer/create/" component={CreateWriter} />
          <Route exact path="/writer/setup/:username" component={SetupWriter} />
          <Route exact path="/writer/view/:username" component={ViewWriter} />
          <Route exact path="/writer/edit/:username" component={UpdateWriter} />
          <Route exact path="/writer/delete/:username" component={DeleteWriter} />

          <Route exact path="/blog/create/" component={CreateBlog} />
          <Route exact path="/blog/view/:pk" component={ViewBlog} />
          <Route exact path="/blog/edit/:pk" component={UpdateBlog} />
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
