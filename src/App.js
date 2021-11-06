import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Nav, Button } from "@douyinfe/semi-ui";
import { IconSemiLogo, IconHelpCircle } from "@douyinfe/semi-icons";
import FormList from "./pages/FormList/FormList";
import Upload from "./pages/UploadFile/UploadFile"
import Finish from "./pages/Finish/Finish";

function App() {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout style={{ border: "1px solid var(--semi-color-border)" }}>
      <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <div>
          <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
            <Nav.Header>
              <IconSemiLogo style={{ fontSize: 36 }} />
            </Nav.Header>
            <Nav.Item
              itemKey="Home"
              text="SAST"
              // icon={<IconHome size="large" />}
            />
            <Nav.Footer>
              <Button
                theme="borderless"
                icon={<IconHelpCircle size="large" />}
                style={{
                  color: "var(--semi-color-text-2)",
                  marginRight: "12px",
                }}
              />
            </Nav.Footer>
          </Nav>
        </div>
      </Header>
      <Content
        style={{
          padding: "24px",
          backgroundColor: "var(--semi-color-bg-0)",
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/finish" component={Finish} />
          </Switch>
          <Switch>
            <Route exact path="/upload" component={Upload} />
          </Switch>
          <Switch>
            <Route exact path="/" component={FormList} />
          </Switch>
        </Router>
      </Content>
      <Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          color: "var(--semi-color-text-2)",
          backgroundColor: "rgba(var(--semi-grey-0), 1)",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <span>Copyright © 2021 NJUPT.SAST</span>
          <span style={{ marginTop: "12px" }}>All Rights Reserved.</span>
        </span>
      </Footer>
    </Layout>
  );
}

export default App;