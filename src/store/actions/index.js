import { actionCreators } from "./creators";
import {
  loginService,
  logoutService,
  signupService,
} from "../../services/api/auth.api";
import { message, notification } from "antd";
import { localUserStorage, logger } from "../../utils";
import { routes } from "../../app/router/routes";

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
            logger.msg(res?.data);
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

  login: (email, password, history) => (dispatch) => {
    dispatch(actionCreators.loginBegin());
    loginService({ email, password })
      .then((res) => {
        if (res?.status === 200) {
          dispatch(actionCreators.loginSuccess(res?.data));
          localUserStorage.setUser(res?.data);
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
    const user = localUserStorage.getUser();
    console.log(user);
    logoutService(user?.pk)
      .then(() => {
        history.push(routes.LOGIN);
        dispatch(actionCreators.logout());
        localUserStorage.setUser({});
      })
      .catch((err) => {
        logger.err(err, "Some error occured");
      });
  },
};

export default actions;
