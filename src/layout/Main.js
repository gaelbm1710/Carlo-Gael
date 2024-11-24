import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/images/logo.png";
import { MenuLayout } from "../../src/components/MenuLayout";

export function MainLayout(props) {
  const { children } = props;
  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <Link to="/">
          <Image src={logo} />
        </Link>
        <MenuLayout />
        <div className="admin-layout__left-bar"></div>
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header"></div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
