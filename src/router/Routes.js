import React from "react";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Map } from "../pages/Map";
import { MainLayout } from "../layout/Main";
import { Routes, Route } from "react-router-dom";

export function AppRoutes() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <>
      <Routes>
        <Route path="/" element={loadLayout(MainLayout, Home)} />
        <Route path="/dashboard" element={loadLayout(MainLayout, Dashboard)} />
        <Route path="/map" element={loadLayout(MainLayout, Map)} />
      </Routes>
    </>
  );
}
