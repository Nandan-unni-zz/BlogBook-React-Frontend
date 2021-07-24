import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import { routes } from "../../router/routes";

const Error404 = () => {
  return (
    <>
      <Navbar feed />
      <Result
        status="404"
        title="404"
        subTitle={
          <p>
            Either the page doesn't exist or you have found a bug {""}
            <a
              href="https://github.com/Nandan-unni/BlogBook-React-Frontend/issues"
              rel="noopener noreferrer"
              target="_blank"
            >
              (Report Now !)
            </a>
            .
          </p>
        }
        extra={
          <Link to={routes.FEED}>
            <Button type="primary">Back to Feed</Button>
          </Link>
        }
      />
    </>
  );
};

export default Error404;
