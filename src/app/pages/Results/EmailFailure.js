import { Button, Form, Input, Result, Row } from "antd";

import { Banner } from "../../components";

const EmailFailure = () => {
  return (
    <div>
      <Banner />
      <Result
        status="error"
        title="Invalid Confirmation Link"
        subTitle="You have just used an expired or invalid email verification link. Please request a new one to continue with BLOGBOOK"
        extra={
          <Row justify="center">
            <Form.Item>
              <Input
                size="large"
                placeholder="Type your email address here..."
              />
            </Form.Item>
            &nbsp; &nbsp; &nbsp;
            <Button type="primary" size="large">
              Request a new one
            </Button>
          </Row>
        }
      />
    </div>
  );
};

export default EmailFailure;
