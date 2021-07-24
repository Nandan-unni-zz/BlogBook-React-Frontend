import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Home
import Login from "../pages/Home/Login";
import Signup from "../pages/Home/Signup";

// General
import Feed from "../pages/Feed";
import Search from "../pages/Search";

// Writer
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

// Blog
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import ReadBlog from "../pages/ReadBlog";

// Results
import Error404 from "../pages/Results/404";
import SignupSuccess from "../pages/Results/SignupSuccess";
import EmailSuccess from "../pages/Results/EmailSuccess";
import EmailFailure from "../pages/Results/EmailFailure";

import { routes } from "./routes";

function Router() {
  return (
    <div className="Keyblogs">
      <BrowserRouter>
        <Switch>
          {/* START: Home */}
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.SIGNUP} component={Signup} />
          {/* END: Home */}

          {/* START: General */}
          <Route exact path={routes.FEED} component={Feed} />
          <Route exact path={routes.SEARCH} component={Search} />
          {/* END: General */}

          {/* START: Writer */}
          <Route exact path={routes.PROFILE(":userId")} component={Profile} />
          <Route exact path={routes.SETTINGS} component={Settings} />
          {/* END: Writer */}

          {/* START: Blog */}
          <Route exact path={routes.CREATE_BLOG} component={CreateBlog} />
          <Route
            exact
            path={routes.READ_BLOG(":blogId")}
            component={ReadBlog}
          />
          <Route
            exact
            path={routes.EDIT_BLOG(":blogId")}
            component={EditBlog}
          />
          {/* END: Blog */}

          {/* START: Results */}
          <Route exact path={routes.SIGNUP_SUCCESS} component={SignupSuccess} />
          <Route
            exact
            path={routes.EMAIL_SUCCESS(":userId")}
            component={EmailSuccess}
          />
          <Route exact path={routes.EMAIL_FAILURE} component={EmailFailure} />
          <Route path="*" component={Error404} />
          {/* END: Results */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
