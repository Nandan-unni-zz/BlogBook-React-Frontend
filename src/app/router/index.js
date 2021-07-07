import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Auth
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

// Features
import Home from "../pages/Features/Home";
import Feed from "../pages/Features/Feed";
import Search from "../pages/Features/Search";

// Writers
import SetupWriter from "../pages/Writers/SetupWriter";
import ViewWriter from "../pages/Writers/ViewWriter";
import UpdateWriter from "../pages/Writers/UpdateWriter";
import DeleteWriter from "../pages/Writers/DeleteWriter";

// Blogs
import CreateBlog from "../pages/Blogs/CreateBlog";
import ViewBlog from "../pages/Blogs/ViewBlog";
import UpdateBlog from "../pages/Blogs/UpdateBlog";
import DeleteBlog from "../pages/Blogs/DeleteBlog";

// Middlewares
import NotFound from "../pages/Middlewares/NotFound";
import SuccessPage from "../pages/Middlewares/SuccessPage";
import InvalidPage from "../pages/Middlewares/InvalidPage";

import { routes } from "./routes";

function Router() {
  return (
    <div className="Keyblogs">
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.HOME} component={Login} />
          <Route exact path={routes.SIGNUP} component={Signup} />
          <Route exact path={routes.LOGOUT} component={Home} />

          <Route exact path={routes.FEED} component={Feed} />
          <Route exact path={routes.SEARCH} component={Search} />
          <Route
            exact
            path={routes.SETUP_WRITER(":username")}
            component={SetupWriter}
          />
          <Route
            exact
            path={routes.VIEW_WRITER(":username")}
            component={ViewWriter}
          />
          <Route
            exact
            path={routes.EDIT_WRITER(":username")}
            component={UpdateWriter}
          />
          <Route
            exact
            path="/writer/delete/:username"
            component={DeleteWriter}
          />

          <Route exact path={routes.CREATE_BLOG} component={CreateBlog} />
          <Route exact path={routes.VIEW_BLOG(":pk")} component={ViewBlog} />
          <Route exact path={routes.EDIT_BLOG(":pk")} component={UpdateBlog} />
          <Route
            exact
            path={routes.DELETE_BLOG(":pk")}
            component={DeleteBlog}
          />

          <Route exact path={routes.SUCCESS} component={SuccessPage} />
          <Route exact path={routes.INVALID} component={InvalidPage} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
