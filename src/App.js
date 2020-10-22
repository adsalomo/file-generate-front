import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import "./App.css";
import axios from "axios";
const downloader = require("js-file-download");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8082",
});

function App() {
  const [id, setId] = useState(null);

  const handleGenerateFile = async () => {
    try {
      const resp = await axiosInstance.post(`/report`, {
        paramTitle: "Titulo 2ccccccccc cccccccccccc cccccccccccccc",
      });
      setId(resp.data.reportId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowFile = async () => {
    try {
      const resp = await axiosInstance.get(`/report`, {
        params: { id },
        responseType: "arraybuffer",
      });
      downloader(resp.data, `${new Date().getTime()}.pdf`);
    } catch (error) {
      const res = JSON.parse(Buffer.from(error.response.data).toString("utf8"));
      alert(res.message);
    }
  };

  return (
    <Container fluid="md">
      <Row>
        <Col lg={12} xs={12}>
          <FormGroup>
            <Button variant="primary" onClick={handleGenerateFile}>
              Generate file
            </Button>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg={3} xs={3}>
          <FormGroup>
            <FormLabel>Id</FormLabel>
            <FormControl disabled={true} value={id != null ? id : id} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg={3} xs={3}>
          <FormGroup>
            <Button variant="primary" onClick={handleShowFile}>
              Ver PDF
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
