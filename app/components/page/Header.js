import React from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

const Header = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="POPULAR WALKS" key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab="NEWEST WALKS" key="2">Content of Tab Pane 2</TabPane>
  </Tabs>
);

export default Header;
