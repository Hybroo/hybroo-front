import React, { useState, useContext } from "react";
import { WebsocketsContext } from "../../context/useWebsockets"
import Sidebar from "../../components/Sidebar";
import {
  Container,
  TitleApp,
  Card,
  ContainerCard,
  FunctionSelected,
} from "./styles";
import FunctionsOutlinedIcon from "@material-ui/icons/FunctionsOutlined";
import FunctionsProblems from "./FunctionsProblems";
import InstanceProblems from "./InstancesProblems";

export default function PageApp() {
  const [selectApplications, setSelectApplications] = useState(3);
  const { sendMessage } = useContext(WebsocketsContext);

  const handleSelected = (event) => {
    setSelectApplications(event);
  };

  function getNamesFunction(name) {
    const functionName = JSON.stringify({
      task: name,
      params: "None",
    });
    sendMessage(functionName);
  }

  

  return (
    <div>
      <Sidebar page="app" />
      <Container>
        <TitleApp>Applications</TitleApp>

        <ContainerCard>
          <Card
            onClick={() => {
              handleSelected(0);
              getNamesFunction("functions_names");
            }}
            className={selectApplications === 0 ? "select" : "card"}
          >
            <FunctionsOutlinedIcon />
            <div>Functions Problems</div>
          </Card>

          <Card
            onClick={() => {
              handleSelected(1);
              getNamesFunction("instances_names");
            }}
            className={selectApplications === 1 ? "select" : "card"}
          >
            <FunctionsOutlinedIcon />
            <div>Instances Problems</div>
          </Card>
        </ContainerCard>
        <FunctionSelected>
          {selectApplications === 0 && (
            <FunctionsProblems />
          )}
          {selectApplications === 1 && <InstanceProblems />}
        </FunctionSelected>
      </Container>
    </div>
  );
}
