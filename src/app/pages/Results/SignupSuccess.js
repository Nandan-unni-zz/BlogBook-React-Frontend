import { Button, Row, Result } from "antd";
import { Banner } from "../../components";

const SignupSuccess = () => {
  return (
    <div>
      <Banner />
      <Result
        status="success"
        title="Account Created"
        subTitle="A confirmation mail have been sent to the email address you provided. Please verify your email address to continue"
        extra={
          <Row justify="center">
            <a href="https://mail.google.com/mail/" rel="noopener noreferrer">
              <Button type="danger" size="large">
                Open GMail
              </Button>
            </a>
            &nbsp; &nbsp; &nbsp;
            <Button type="primary" size="large">
              Resend Confirmation Mail
            </Button>
          </Row>
        }
      />
    </div>
  );
};

export default SignupSuccess;
