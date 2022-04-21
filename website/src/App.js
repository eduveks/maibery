import { Layout } from "antd";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Unsubscribe from "./pages/Unsubscribe";

import './App.less';

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Layout>
          <Content>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/unsubscribe/:uid" element={<Unsubscribe />}/>
            </Routes>
          </Content>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
