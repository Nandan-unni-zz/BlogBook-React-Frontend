import { message } from "antd";

const logger = {
  msg: (msg) => console.info("MSG: ", msg),
  err: (err, errMsg) => {
    errMsg && message.error(errMsg);
    console.error("ERR: ", err.toString(), ": ", { err });
  },
};

export default logger;
