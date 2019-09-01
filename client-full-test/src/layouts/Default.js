import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainHeader from "../components/layouts/MainHeader";
import MainFooter from "../components/layouts/MainFooter";

const DefaultLayout = ({ children, noNavbar }) => (
  <Container fluid>
    <MainHeader />
    <div className="container">
        {!noNavbar}
        {children}
    </div>

    <MainFooter />
  </Container>
);

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
