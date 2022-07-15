import React from "react";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import * as PB from "./template";
import { TemplateServiceClient } from "./template.client";
import { Container, Row, Col } from "react-bootstrap";

const GrpcWebTest = () => {
  // set state variables for the grpc-web transport
  const [transport, setTransport] = React.useState<
    GrpcWebFetchTransport | undefined
  >();

  // set state variables for the grpc-web client
  const [client, setClient] = React.useState<
    TemplateServiceClient | undefined
  >();

  const [message, setMessage] = React.useState<string>("");
  const [response, setResponse] = React.useState<string>("");

  React.useEffect(() => {
    if (transport == undefined) {
      setTransport(
        new GrpcWebFetchTransport({
          baseUrl: "http://localhost:8080/grpc",
        })
      );
    }
  }, [transport]);

  React.useEffect(() => {
    if (client == undefined && transport) {
      setClient(new TemplateServiceClient(transport));
    }
  }, [client, transport]);

  return (
    <Container>
      <Row className="m-3">
        <button
          onClick={() => {
            client
              ?.ping({})
              .then(() => {
                alert("pong");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Send PING to gPRC Test Server
        </button>
      </Row>
      <Row className="m-3">
        Message: 
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button
          className="m-2"
          onClick={() => {
            client
              ?.helloWorld({ name: message })
              .then((res) => {
                setResponse(res.response.message);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          "Send Message!"
        </button>
        <p className="m-3">{"Message Received: "}</p>
        {response}
      </Row>
    </Container>
  );
};

export default GrpcWebTest;
