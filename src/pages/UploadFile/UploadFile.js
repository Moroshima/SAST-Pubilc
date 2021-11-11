import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Toast,
  Banner,
  Tag,
} from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import axios from "axios";

const { Text } = Typography;

function UploadFile(props) {
  console.log(props.location.id);
  const [id, setId] = useState("something");
  const [tagList, setTagList] = useState({});
  let fileArray = [];
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
          <input
            id={"uploadClick"}
            type="file"
            accept=".zip,.7z,.rar"
            style={{ display: "none" }}
            onChange={(event) => {
              console.log(event);
              // input.addEventListener('change', updateImageDisplay);
              var fileInput = document.getElementById("uploadClick");
              var files = fileInput.files;
              console.log(files);

              for (let count = 0; count < files.length && count < 3; count++) {
                fileArray[count] = files[count];
              }
              console.log(fileArray);
            }}
            multiple
          />
          <Button
            style={{ marginBottom: "18px" }}
            onClick={() => {
              var fileInput = document.getElementById("uploadClick");
              var files = fileInput.files;
              console.log(files);
              for (let count = 0; count < files.length && count < 3; count++) {
                fileArray[count] = files[count];
              }
              console.log(fileArray);
            }}
          >
            <label htmlFor={"uploadClick"}>选择文件</label>
          </Button>
          <br />
          <Row>
            <Tag size="large" closable={true}></Tag>
          </Row>
          <Row>
            <Button
              style={{ marginTop: "12px" }}
              icon={<IconUpload />}
              theme="light"
              onClick={() => {
                var fileInput = document.getElementById("uploadClick");
                var files = fileInput.files;
                console.log(files);

                for (let count = 0; count < files.length; count++) {
                  if (files[count].size > 110) alert("error");
                  else {
                    let formData = new FormData();
                    formData.append("id", id);
                    formData.append("multipartFile", files[0]);

                    axios({
                      method: "post",
                      url: "/user/upload",
                      data: formData,
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }).then(function (res) {
                      console.log(res);
                      if (res.data.success) {
                        Toast.success({
                          content: "文件上传成功！",
                          duration: 2,
                        });
                      } else Toast.error({ content: "文件上传失败！", duration: 2 });
                    });
                  }
                }
              }}
            >
              点击上传
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
export default UploadFile;
