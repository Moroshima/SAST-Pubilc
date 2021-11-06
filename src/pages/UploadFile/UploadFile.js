import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, Form, Button, Typography } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import axios from "axios";

const { Text } = Typography;

function UploadFile(props) {
  console.log(props.location.id);
  const [id, setId] = useState("something");
  useEffect(() => {
    if (!props.location.id) setId(null);
    else setId(props.location.id)
    console.log(id);
  }, [props]);
  if (id === null) {
    console.log(id);
    return <Redirect to="/" />;
  }

  return (
    <Card>
      <Text>{id}</Text>
      <Form>
        <Form.Upload
          field="files"
          label="证明文件（Upload）"
          limit={1}
          action="/user/upload"
          data={{ id: props.location.id }}
          accept=".zip"
          afterUpload={(response) => {
            if (response) {
              console.log(response);
              // return {
              //   autoRemove: false,
              //   status: "uploadFail",
              //   validateMessage: "内容不合法",
              //   name: "RenameByServer.jpg",
              // };
            } else {
              return {};
            }
          }}
          onRemove={() => {
            axios
              .delete("/user/delete", {
                // id: values.id,
              })
              .then((res) => {
                console.log(res);
              });
          }}
        >
          <Button icon={<IconUpload />} theme="light">
            点击上传
          </Button>
        </Form.Upload>
      </Form>
    </Card>
  );
}
export default UploadFile;
