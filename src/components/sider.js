import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Sidebar,
  Menu
} from 'semantic-ui-react';

class Sider extends Component {
  render() {
    const homeData = {
      sidebar: [
        { item: 'Menu1' },
        { item: 'Menu2' },
        { item: 'Menu3' },
        { item: 'Menu4' },
        { item: 'Menu5' },
      ]
    }

    const icons = [
      'home',
      'fire',
      'toggle up',
      'ticket alternate',
      'write square'
    ];

    const { visible } = this.props.ui.sider;

    return (
      <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        fixed="left"
        vertical
        borderless
        visible={visible}
        style={{ height: '100vh', paddingTop: 75, zIndex: 1 }}
      >
        <h4
          style={{
            textTransform: 'uppercase',
            padding: '0 0 5px 20px',
            letterSpacing: 2
          }}
        >
          USER
        </h4>
        {homeData.sidebar.map( (value, key) =>
          <Menu.Item
            key={value.item}
            name={value.item}
            icon={icons[key]}
            style={{ fontSize: 17 }}
          />
        )}
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    ui: state.ui
  };
};

export default connect(mapStateToProps)(Sider);