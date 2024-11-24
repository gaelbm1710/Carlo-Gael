import React from "react";
import { Menu, Icon, DropdownMenu, Dropdown } from "semantic-ui-react";
import "../styles/main.scss";
import { Link, useLocation } from "react-router-dom";

export function MenuLayout() {
  const { pathname } = useLocation();
  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };
  return (
    <>
      <Menu fluid vertical icon text className="admin-menu">
        <Dropdown>
          <DropdownMenu className="usuario-menu-lista">
            <Menu.Item as={Link} to="/" active={isCurrentPath("/")}>
              <Icon name="home" />
              Inicio
            </Menu.Item>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownMenu>
            <Menu.Item
              as={Link}
              to="/dashboard"
              active={isCurrentPath("/dashboard")}
            >
              <Icon name="dashboard" />
              Dashboard
            </Menu.Item>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownMenu>
            <Menu.Item as={Link} to="/map" active={isCurrentPath("/map")}>
              <Icon name="map outline" />
              Mapa
            </Menu.Item>
          </DropdownMenu>
        </Dropdown>
      </Menu>
    </>
  );
}
