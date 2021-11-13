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
  Modal,
} from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import axios from "axios";
import "./UploadFIle.css";

function UploadFile(props) {
  console.log(props.location.id);
  const [id, setId] = useState("something");
  const [spinState, setSpinState] = useState(false);
  const [tagList, setTagList] = useState();
  const [modelVisible, setModelVisible] = useState(false);
  const [selectState, setSelectState] = useState(false);
  const [isAllSuccess, setIsAllSuccess] = useState(true);
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

  // 复盘：Filelist之所以不是Array是为了使被选定的文件列表不轻易被修改

  return (
    <Card>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          {/* htmlFor的写法不够优雅，点击还是得点击到文字才能弹出选择窗口，但似乎无更优解（不过好在通过手写label样式我们最终还是优雅的实现了这样一个功能） */}
          <Banner type="info" description="文件上传大小请勿超过600MiB" />
          <Row style={{ marginBottom: "14px", marginTop: "14px" }}>
            <label htmlFor={"uploadClick"} id="selectFile">
              {selectState ? "重新选择文件" : "选择上传文件"}
            </label>
          </Row>
          <Row>
            {/* map方法对对象及对象内的元素的要求极高，在很多情况下for循环还是有其存在的意义的 */}
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
              disabled={spinState}
              icon={<IconUpload />}
              theme="light"
              onClick={() => {
                let successFileCount = 0;
                var fileInput = document.getElementById("uploadClick");
                var files = fileInput.files;
                console.log(files);
                if (files.length !== 0) setSpinState(true);
                else
                  Toast.info({
                    content: "请先选择文件再进行上传！",
                    duration: 2,
                  });
                if (files.length > 5) {
                  Toast.error({
                    content:
                      "上传文件数量上限为5，请重新选择，文件过多可打包上传！",
                    duration: 4,
                  });
                  setSpinState(false);
                } else {
                  for (let count = 0; count < files.length; count++) {
                    let formData = new FormData();
                    formData.append("id", id);
                    formData.append("multipartFile", files[count]);
                    if (files[count].size > 629145600) {
                      Toast.error({
                        content: `文件${files[count].name}大小过大，无法上传！`,
                        duration: 4,
                      });
                      if (count + 1 === files.length) setSpinState(false);
                    } else {
                      axios({
                        method: "post",
                        url: "/user/upload",
                        data: formData,
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        // eslint-disable-next-line no-loop-func
                      }).then(function (res) {
                        console.log(res);
                        if (res.data.success) {
                          console.log(res);
                          if (count + 1 === files.length) setSpinState(false);
                          Toast.success({
                            content: `文件${files[count].name}上传成功！`,
                            duration: 4,
                          });
                          successFileCount++;
                          if (successFileCount === files.length)
                            setModelVisible(true);
                          console.log(successFileCount);
                        } else {
                          console.log(res);
                          if (count + 1 === files.length) setSpinState(false);
                          setIsAllSuccess(false);
                          Toast.error({
                            content: `文件${files[count].name}上传失败，请尝试重新上传！`,
                            duration: 4,
                          });
                        }
                      });
                    }
                  }
                }
              }}
            >
              {isAllSuccess ? "点击上传" : "部分文件上传失败，点击重新上传"}
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
      <Modal
        title="上传成功"
        visible={modelVisible}
        maskClosable={false}
        closable={false}
        footer={
          <Button
            type="primary"
            onClick={() => {
              props.history.push({
                pathname: "/finish",
                id: id,
              });
            }}
          >
            确定
          </Button>
        }
      >
        恭喜，文件已上传成功！
      </Modal>
      <input
        id={"uploadClick"}
        type="file"
        accept=".zip,.7z,.rar,.pdf"
        style={{ display: "none" }}
        onChange={(event) => {
          console.log(event);
          var fileInput = document.getElementById("uploadClick");
          var files = fileInput.files;
          console.log(files);
          if (files.length !== 0) setSelectState(true);
          else setSelectState(false);
          // 转写为数组这一步似乎是必不可少的？
          for (let count = 0; count < files.length; count++) {
            fileArray[count] = files[count];
          }
          // 为了动态更新内容，我们除了使用State将Array转为State似乎别无选择
          setTagList(fileArray);
        }}
        multiple
      />
    </Card>
  );
}
export default UploadFile;
