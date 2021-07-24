import { message, notification } from "antd";

import { actionCreators } from "./creators";
import { userStorage, logger } from "../../../utils";
import { routes } from "../../../app/router/routes";
import {
  loginService,
  logoutService,
  signupService,
} from "../../../services/api/auth.api";
import { getWriterService } from "../../../services/api/writer.api";

const actions = {
  signup: (name, email, password, cpassword, history) => (dispatch) => {
    dispatch(actionCreators.signupBegin());
    if (password === cpassword) {
      signupService({ name, email, username: email, password })
        .then((res) => {
          if (res?.status === 201) {
            dispatch(actionCreators.signupSuccess());
            message.success("Account created ! Verify your email to continue");
            history.push(routes.SIGNUP_SUCCESS);
          } else if (res?.status === 204) {
            dispatch(actionCreators.signupSuccess());
            message.success("Account created ! Login to continue");
            history.push(routes.LOGIN);
          } else {
            dispatch(actionCreators.signupError());
            message.error("Some error occured");
          }
        })
        .catch((err) => {
          dispatch(actionCreators.loginError("Some error occured"));
          logger.err(err, "Some error occured");
        });
    } else {
      dispatch(actionCreators.signupError());
      message.error("Passwords didn't match !");
    }
  },

  autoLogin: (pk) => (dispatch) => {
    getWriterService(pk).then((res) => {
      if (res?.status === 200) {
        dispatch(actionCreators.loginSuccess(res?.data));
        userStorage.setUser(res?.data);
        dispatch(actionCreators.setUserId(res?.data?.pk));
      }
    });
  },

  login: (email, password, history) => (dispatch) => {
    dispatch(actionCreators.loginBegin());
    loginService({ email, password })
      .then((res) => {
        if (res?.status === 200) {
          dispatch(actionCreators.loginSuccess(res?.data));
          userStorage.setUser(res?.data);
          dispatch(actionCreators.setUserId(res?.data?.pk));
          notification.info({ message: `Welcome back, ${res?.data?.name}` });
          history.push(routes.FEED);
        } else {
          dispatch(actionCreators.loginError());
          message.error("Invalid email or password");
        }
      })
      .catch((err) => {
        dispatch(actionCreators.loginError("Some error occured"));
        logger.err(err, "Some error occured");
      });
  },

  logout: (history) => (dispatch) => {
    const user = userStorage.getUser();
    logoutService(user?.pk)
      .then(() => {
        history.push(routes.LOGIN);
        dispatch(actionCreators.logout());
        dispatch(actionCreators.setUserId(-1));
        userStorage.setUser({});
      })
      .catch((err) => {
        logger.err(err, "Some error occured");
      });
  },
};

export default actions;
