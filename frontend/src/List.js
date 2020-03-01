import React from 'react';

import {
    Link
  } from "react-router-dom";

import { Menu, Icon } from 'antd';
import { Typography, Button } from 'antd';

import "antd/dist/antd.css";
import './css/list.css';

const { SubMenu } = Menu;
const { Title, Text } = Typography;

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      let mythis = this;
      return (
        <div>
          <Title>List of stars</Title>
          <Text strong>Name - Galaxy</Text>
          <ul>
            { mythis.props.list.map(function(element, index) {
              
              return  <li key={ index }><span >{ element.name } - { element.galaxy } - </span>
                        <Menu style={{ width: 70 }}>
                          <SubMenu key="sub4" title={<Icon type="setting"/>}>
                            <Menu.Item key="9"><Link to={{ pathname: ("/info/"+element.id) , state: {star: element}}}><span>En savoir plus</span></Link></Menu.Item>
                            <Menu.Item key="10"><Link to={{ pathname: ("/edit/"+element.id) , state: {star: element}}}><span>Modifier</span></Link></Menu.Item>
                            <Menu.Item key="11"><a href="" onClick={(e) =>{mythis.props.delete(e,element.id);}}><span>Supprimer</span></a></Menu.Item>
                          </SubMenu>
                        </Menu>
                      </li>
            })}
          </ul>
          <Button type="primary">
            <Link to="/add">Add</Link>
          </Button>
        </div>
      );
    }
}