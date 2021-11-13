import React from "react";
import { Form, Row, Col, Button, Card, Toast } from "@douyinfe/semi-ui";
import axios from "axios";

function FormList(props) {
  return (
    <Card>
      <Form
        onSubmit={(values) => {
          console.log("Content:" + JSON.stringify(values));
          axios
            .post("/user/add", {
              username: values.username,
              id: values.id,
              study: values.study,
              major: values.major,
              teamName: values.teamName,
            })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                Toast.success({ content: "表单提交成功！", duration: 0.75 });
                setTimeout(() => {
                  props.history.push({
                    pathname: "/upload",
                    id: values.id,
                  });
                }, 750);
              } else Toast.error({ content: "表单提交失败！", duration: 2 });
            });
        }}
      >
        {({ formState, values, formApi }) => (
          <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Input
                label="姓名"
                field="username"
                placeholder="请输入姓名"
                rules={[{ required: true, message: "必须填写姓名" }]}
              />
              <Form.Input
                label="学号"
                field="id"
                placeholder="请输入学号"
                rules={[{ required: true, message: "必须填写学号" }]}
              />
              <Form.Input
                label="学院"
                field="study"
                placeholder="请输入学院"
                rules={[{ required: true, message: "必须填写所属学院" }]}
              />
              <Form.Input
                label="专业"
                field="major"
                placeholder="请输入专业"
                rules={[{ required: true, message: "必须填写所属专业" }]}
              />
              <Form.Input
                label="队伍名称"
                field="teamName"
                placeholder="请输入队伍名称"
                rules={[{ required: true, message: "必须填写队伍名称" }]}
              />
              <Button
                type="primary"
                htmlType="submit"
                className="btn-margin-right"
                style={{ marginTop: 12 }}
              >
                提交
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
}

export default FormList;
