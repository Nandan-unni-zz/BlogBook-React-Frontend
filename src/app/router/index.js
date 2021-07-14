import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Home
import Login from "../pages/Home/Login";
import Signup from "../pages/Home/Signup";

// General
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

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
          <Route exact path={routes.PROFILE(":userId")} component={Profile} />
          <Route exact path={routes.SEARCH} component={Search} />
          {/* END: General */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
