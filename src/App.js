import * as React from "react";

import Router from "./routes";
import Layout from "./layout";
export default function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}
