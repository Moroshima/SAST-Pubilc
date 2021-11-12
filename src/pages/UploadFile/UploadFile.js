import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Toast,
  Banner,
  Tag,
  Spin,
} from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import axios from "axios";
import "./UploadFIle.css";

function UploadFile(props) {
  console.log(props.location.id);
  const [id, setId] = useState("something");
  const [spinState, setSpinState] = useState(false);
  const [tagList, setTagList] = useState();
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
          {/* <Button
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
          > */}
          {/* htmlFor的写法不够优雅，点击还是得点击到文字才能弹出选择窗口，但似乎无更优解 */}
          {/* eslint-disable-next-line no-undef */}
          <Banner type="info" description="文件上传大小请勿超过600MiB" />
          <Row style={{ marginBottom: "14px", marginTop: "14px" }}>
            <label htmlFor={"uploadClick"} id="selectFile">
              点击选择文件
            </label>
          </Row>
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
            {tagList &&
              tagList.map((item, index) => {
                return (
                  <Row>
                    <Tag
                      style={{ marginRight: "10px", marginBottom: "4px" }}
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
                  </Row>
                );
              })}
          </Row>
          <Row>
            <Button
              // style={{ marginTop: "12px" }}
              icon={<IconUpload />}
              theme="light"
              onClick={() => {
                setSpinState(true);
                var fileInput = document.getElementById("uploadClick");
                var files = fileInput.files;
                console.log(files);

                // for (let count = 0; count < files.length; count++) {
                //   if (files[count].size > 110) alert("error");
                //   else {
                if (files.length > 5) {
                  Toast.error({
                    content: `上传文件数量上限为5，请重新选择!`,
                    duration: 4,
                  });
                  setSpinState(false);
                } else
                  for (let count = 0; count < files.length; count++) {
                    let formData = new FormData();
                    formData.append("id", id);
                    formData.append("multipartFile", files[count]);
                    if (files[count].size > 629145600) {
                      Toast.error({
                        content: `文件${files[count].name}大小过大，无法上传！`,
                        duration: 4,
                      });
                      if ((count+1) === files.length) setSpinState(false);
                    } else {
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
                          console.log(res);
                          if ((count+1) === files.length)setSpinState(false);
                          Toast.success({
                            content: `文件${files[count].name}上传成功！`,
                            duration: 4,
                          });
                        } else {
                          console.log(res);
                          if ((count+1) === files.length)setSpinState(false);
                          Toast.error({
                            content: `文件${files[count].name}上传失败！`,
                            duration: 4,
                          });
                        }
                      });
                    }
                  }
              }}
            >
              点击上传
            </Button>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Spin
              style={{ width: "150px" }}
              spinning={spinState}
              tip="文件上传中，请稍等……"
            ></Spin>
          </Row>
        </Col>
      </Row>
      <input
        id={"uploadClick"}
        type="file"
        accept=".zip,.7z,.rar,.pdf"
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
        multiple
      />
    </Card>
  );
}
export default UploadFile;
