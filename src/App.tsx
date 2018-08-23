import { Col, Row } from 'antd';
import * as React from 'react';
import './App.css';
import MyCurrency from './containers/MyCurrency';

class App extends React.Component {
  public render() {
    return (
      <Row>
        <Col span={8} offset={8}>
          <MyCurrency/>
        </Col>
      </Row>
    );
  }
}

export default App;
