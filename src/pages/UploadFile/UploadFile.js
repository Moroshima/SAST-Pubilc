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
  const [tagList, setTagList] = useState([
    { name: "已选择的文件会在这里显示" },
  ]);
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

  // 复盘：filelist之所以不是array是为了不轻易被修改
  //

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

              // 转写为数组这一步似乎是必不可少的？
              for (let count = 0; count < files.length; count++) {
                fileArray[count] = files[count];
              }
              // 为了动态更新内容，我们除了使用state将array再转为state似乎别无选择
              setTagList(fileArray);
            }}
            // multiple
          />
          <Button
            style={{ marginBottom: "18px" }}
            // onClick={() => {
            //   var fileInput = document.getElementById("uploadClick");
            //   var files = fileInput.files;
            //   console.log(files);
            //   for (let count = 0; count < files.length && count < 3; count++) {
            //     fileArray[count] = files[count];
            //   }
            //   console.log(fileArray);
            // }}
          >
            {/* htmlFor的写法不够优雅，点击还是得点击到文字才能弹出选择窗口，但似乎无更优解 */}
            <label htmlFor={"uploadClick"}>点击选择文件</label>
          </Button>
          <br />
          <Row>
            {/* <Button
              onClick={() => {
                console.log(tagList[0].name);
                console.log(tagList);
              }}
            >
              11
            </Button> */}
            {/* map对对象及对象内的元素的要求极高，在很多情况下for循环还是有其存在的意义的 */}
            {tagList.map((item, index) => {
              return (
                <Tag
                  style={{ marginRight: "10px" }}
                  size="large"
                  closable={false}
                  onClose={() => {
                    fileArray.splice(index, 1);
                    setTagList(fileArray);
                    console.log(fileArray);
                  }}
                >
                  {item.name}
                </Tag>
              );
            })}
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

                // for (let count = 0; count < files.length; count++) {
                //   if (files[count].size > 110) alert("error");
                //   else {
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
              // }}
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
