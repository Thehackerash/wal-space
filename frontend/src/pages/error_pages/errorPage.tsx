import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
interface ErrorProps {
  statuscode: any;
}
const ErrorPage: React.FC<ErrorProps> = (props): JSX.Element => {
  return (
    <Result
      status={props.statuscode}
      title={props.statuscode}
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" className="bg-blue-600">
          <Link to={`/dashboard`}>Back Home</Link>
        </Button>
      }
    />
  );
};

export default ErrorPage;
