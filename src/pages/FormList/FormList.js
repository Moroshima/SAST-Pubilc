import React from "react";
import { Form, Row, Col, TextArea, Button, Card } from "@douyinfe/semi-ui";
import axios from "axios";
import "./FormList.css";

function FormList(props) {
  return (
    <Card>
      <Form
        onSubmit={(values) => {
          props.history.push({
            pathname: "/upload",
            id: values.id,
          });
          // axios
          //   .post("/user/add", {
          //     username: values.username,
          //     id: values.id,
          //     study: values.study,
          //     major: values.major,
          //     teamName: values.teamName,
          //   })
          //   .then((res) => {
          //     console.log(res);
          //   });
          console.log("content:" + JSON.stringify(values));
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
              <Form.Label text="FormState实时映射值："></Form.Label>
              <TextArea value={JSON.stringify(formState.values)}></TextArea>

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
