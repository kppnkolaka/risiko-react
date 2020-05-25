import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Segment,
  Button,
  Icon,
  Header,
  Table
} from 'semantic-ui-react';
import { FetchRisiko } from '../../actions/risiko';

class Risiko extends Component {
  componentDidMount = () => {
    this.props.fetchRisiko();
  }

  render() {
    console.log('TAI', this.props.risiko);
    return (
      <div>
        <Grid divided='vertically' padded>
          <Grid.Row>
            <Grid.Column>
              <Segment padded>
                <Button 
                  icon 
                  labelPosition='left' 
                  floated='right' 
                  positive 
                  size='small'
                >
                  <Icon name='plus' />
                  Tambah
                </Button>
                <Header as='h3'>
                  <Icon name='table' />
                  <Header.Content>Daftar Risiko</Header.Content>
                </Header>
                <Table celled sortable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell rowSpan='2'>Nomor</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>Sasaran Organisasi</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>Kejadian Risiko</Table.HeaderCell>
                      <Table.HeaderCell colSpan='2'>Besaran Risiko</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>Awal Tahun</Table.HeaderCell>
                      <Table.HeaderCell>Proyeksi Akhir Tahun</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      this.props.risiko.data.map( (item, index) => {
                        return (
                          <Table.Row key={index}>
                            <Table.Cell>{ item[3].value }</Table.Cell>
                            <Table.Cell>{ item[2].value }</Table.Cell>
                            <Table.Cell>{ item[4].value[0].value }</Table.Cell>
                            <Table.Cell>{ item[9].value[0].value }</Table.Cell>
                            <Table.Cell>{ item[9].value[1].value }</Table.Cell>
                          </Table.Row>
                        )
                      })
                    }
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    risiko: state.risiko
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRisiko : () => dispatch(FetchRisiko())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Risiko);