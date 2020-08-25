import React from "react";
import { Container } from "react-bootstrap";
import logo from "./assets/imgs/logo.svg"

const App = () => (
    <Container>
        <h1>Bootstrap starter template</h1>
        <img src={logo} />
        <p className="lead">
            Use this document as a way to quickly start any new project.
            <br /> All you get is this text and a mostly barebones HTML
            document.
        </p>
    </Container>
);

export default App;
