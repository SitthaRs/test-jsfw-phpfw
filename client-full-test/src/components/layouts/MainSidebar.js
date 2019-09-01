import React from "react";
import { Row } from 'react-bootstrap';
import sidebarNavItems from "../../data/sidebar-nav-items";
class MainSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg nav-second">
        <Row>
          {
            sidebarNavItems.map((sidebarNavItem, index) => {
              return (
                <label>{sidebarNavItem.label}</label>
              );
            })
          }
        </Row>
      </nav>
    );
  }
}

export default MainSidebar;
