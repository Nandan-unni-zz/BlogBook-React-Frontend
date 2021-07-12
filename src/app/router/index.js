import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Home
import Login from "../pages/Home/Login";
import Signup from "../pages/Home/Signup";

// General
import Feed from "../pages/Feed";

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
          {/* END: General */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
