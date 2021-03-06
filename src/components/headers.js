import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  Header,
  Grid,
  Responsive,
  Button,
  Icon,
  Dropdown,
  Segment
} from 'semantic-ui-react';
import { ToggleSidebar } from '../actions/ui';

class Headers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sider: {
        visible: props.ui.sider.visible
      }
    }
  }

  handleToggleClick = () => {
    this.setState(
      {
        sider: {
          visible: !this.state.sider.visible
        }
    })
    this.props.toggleSidebar(this.state.sider.visible);
  };

  render() {
    const trigger = <span>Hi, user</span>;

    return (
      <Grid divided='vertically'>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Menu borderless inverted color="teal" fixed="top" size="large">
              <Menu.Item style={{ width:230, fontSize:17 }}>
                <Responsive minWidth={720} maxWidth={1920}>
                  TESTING
                </Responsive>
                <Responsive minWidth={720} maxWidth={1920}>
                  <Button
                    icon 
                    color="teal"
                    style={{ marginLeft: "100px" }}
                    onClick={ this.handleToggleClick }
                  >
                    <Icon name="sidebar" />
                  </Button>
                </Responsive>
              </Menu.Item>

              <Menu.Menu position="right">
                <Responsive minWidth={720} maxWidth={1920}>
                  <Dropdown
                    trigger={trigger}
                    icon={null}
                    className="link item"
                    style={{ height: '100%' }}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        Dropdown
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Responsive>
              </Menu.Menu>
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment 
              inverted 
              color='grey' 
              style={{ marginTop: "10px" }}
            >
              <Header as='h3'>
                HEADER
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: (isVisible) => dispatch(ToggleSidebar(isVisible))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(Headers);