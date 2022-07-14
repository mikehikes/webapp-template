import React from "react";
import "./scss/App.scss"; // react-bootstrap css
import "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GrpcWebTest from "./GrpcWebTest";

// for actual development, this component would be located in a separate file, of course
const HelloWorld = () => <h1>Hello World</h1>;

const App: React.FC = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GrpcWebTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
