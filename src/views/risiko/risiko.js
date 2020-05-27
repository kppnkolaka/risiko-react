import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Segment,
  Button,
  Icon,
  Header,
  Table,
} from 'semantic-ui-react';
import { FetchRisiko } from '../../actions/risiko';
import ModalRisiko from './modal-risiko';

class Risiko extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      mainTable: [],
      method: '',
      labels: {
        nomor: 'Nomor', 
        sasaran_organisasi_id: 'Sasaran Organisasi', 
        kejadian: 'Kejadian Risiko', 
        awal: 'Awal Tahun', 
        akhir: 'Akhir Tahun'}
    }
  }

  showModal = (open, mainTable, method) => {
    this.setState({
      modal: open,
      mainTable,
      method
    })
  }

  componentDidMount = () => {
    this.props.fetchRisiko();
  }

  render() {
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
                  onClick={() => this.showModal(true, {}, 'post')}
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
                      <Table.HeaderCell rowSpan='2'>{this.state.labels.nomor}</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>{this.state.labels.sasaran_organisasi_id}</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>{this.state.labels.kejadian}</Table.HeaderCell>
                      <Table.HeaderCell colSpan='2'>Proyeksi Besaran Risiko</Table.HeaderCell>
                      <Table.HeaderCell colSpan='2'>Aksi</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>{this.state.labels.awal}</Table.HeaderCell>
                      <Table.HeaderCell>{this.state.labels.akhir}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      this.props.risiko.data.map( (item, index) => {
                        const mainTable = {
                          nomor: item[3].value,
                          awal: item[9].value[0].value,
                          akhir: item[9].value[1].value,
                          kejadian: item[4].value[0].value,
                          sasaran_organisasi_id: item[2].value[1].value
                        }

                        return (
                          <React.Fragment>
                            <Table.Row key={index}>
                              <Table.Cell>{ item[3].value }</Table.Cell>
                              <Table.Cell>
                                { item[2].value[0].value }
                              </Table.Cell>
                              <Table.Cell>{ item[4].value[0].value }</Table.Cell>
                              <Table.Cell>{ item[9].value[0].value }</Table.Cell>
                              <Table.Cell>{ item[9].value[1].value }</Table.Cell>
                              <Table.Cell>
                                <Button 
                                  icon 
                                  color='blue'
                                  onClick= { () => this.showModal(
                                    true,
                                    mainTable,
                                    'put'
                                  ) }
                                >
                                  <Icon name='edit' />
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row key={index}>
                              <Table.Cell colSpan="6">
                                <Segment color='orange'>Orange
                                </Segment>
                              </Table.Cell>
                            </Table.Row>
                          </React.Fragment>
                        )
                      })
                    }
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ModalRisiko
          open={this.state.modal}
          onClose={this.showModal}
          mainTable={this.state.mainTable}
          method={this.state.method}
          labels={this.state.labels}
          {...this.props}
        />
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