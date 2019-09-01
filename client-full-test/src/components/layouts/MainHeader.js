import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";

class MainHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contained : null,
      menuItems : null,
      copyright : null
    };
  }

  render() {
    return (
      <header className="main-footer d-flex p-2 px-3 bg-white border-top">
        <Container fluid={this.props.contained}>
          <Row>
            <Nav>
              {this.props.menuItems.map((item, idx) => (
                <Nav.Item key={idx}>
                  <Nav.Link to={item.to}>
                    {item.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <span className="copyright ml-auto my-auto mr-2">{this.props.copyright}</span>
          </Row>
        </Container>
      </header>
    );
  }
}

MainHeader.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainHeader.defaultProps = {
  contained: false,
  menuItems: [
    {
      title: "Home",
      to: "#"
    },
    {
      title: "Services",
      to: "#"
    },
    {
      title: "About",
      to: "#"
    },
    {
      title: "Products",
      to: "#"
    },
    {
      title: "Blog",
      to: "#"
    }
  ]
};

export default MainHeader;
