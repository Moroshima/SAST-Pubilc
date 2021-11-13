import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, Typography, Button, Row, Col } from "@douyinfe/semi-ui";
import { IconTickCircle } from "@douyinfe/semi-icons";

const { Text } = Typography;

function Finish(props) {
  console.log(props.location.id);
  const [id, setId] = useState("something");
  useEffect(() => {
    if (!props.location.id) setId(null);
    else setId(props.location.id);
    console.log(id);
  }, [id, props]);
  if (id === null) {
    console.log(id);
    return <Redirect to="/" />;
  }
  return (
    <Card>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Row
            type="flex"
            justify="center"
            style={{ marginTop: "36px", marginBottom: "12px" }}
          >
            <IconTickCircle
              style={{ color: "rgba(var(--semi-green-6), 1)" }}
              size="extra-large"
            />
          </Row>
          <Row type="flex" justify="center" style={{ marginBottom: "24px" }}>
            <Text type="success" size="normal" strong={true}>
              恭喜，比赛资料已全部上传成功！
            </Text>
          </Row>
          <Row type="flex" justify="center">
            <Button
              type="tertiary"
              onClick={() => {
                props.history.push({
                  pathname: "/",
                });
              }}
            >
              再填一份
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
export default Finish;
