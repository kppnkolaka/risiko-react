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
      detail: {
        open: false,
        key: ''
      },
      modal: false,
      mainTable: [],
      method: '',
      labels: {
        utama: {
          nomor: 'Nomor', 
          sasaran_organisasi_id: 'Sasaran Organisasi', 
          kejadian: 'Kejadian',
          penyebab: 'Penyebab',
          dampak: 'Dampak',
          awal: 'Awal Tahun', 
          akhir: 'Akhir Tahun'
        },
        detail: {

        }
      }
    }
  }

  showModal = (open, mainTable, method) => {
    this.setState({
      modal: open,
      mainTable,
      method
    })
  }

  showDetail = (show, key) => {
    this.setState({detail: {
      open: show,
      key
    }});
  }

  componentDidMount = () => {
    this.props.fetchRisiko();
  }

  render() {
    console.log(this.state.detail, 'BBBBB')
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
                      <Table.HeaderCell rowSpan='2'>{this.state.labels.utama.nomor}</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>{this.state.labels.utama.sasaran_organisasi_id}</Table.HeaderCell>
                      <Table.HeaderCell colspan='3'>Risiko</Table.HeaderCell>
                      <Table.HeaderCell colSpan='2'>Proyeksi Besaran Risiko</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>Aksi</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>{this.state.labels.utama.kejadian}</Table.HeaderCell>
                      <Table.HeaderCell>{this.state.labels.utama.penyebab}</Table.HeaderCell>
                      <Table.HeaderCell>{this.state.labels.utama.dampak}</Table.HeaderCell>
                      <Table.HeaderCell>{this.state.labels.utama.awal}</Table.HeaderCell>
                      <Table.HeaderCell>{this.state.labels.utama.akhir}</Table.HeaderCell>
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
                          penyebab: item[4].value[1].value,
                          dampak: item[4].value[2].value,
                          sasaran_organisasi_id: item[2].value[1].value
                        }

                        return (
                          <React.Fragment>
                            <Table.Row key={index}>
                              <Table.Cell>{ item[3].value }</Table.Cell>
                              <Table.Cell>{ item[2].value[0].value }</Table.Cell>
                              <Table.Cell>{ item[4].value[0].value }</Table.Cell>
                              <Table.Cell>{ item[4].value[1].value }</Table.Cell>
                              <Table.Cell>{ item[4].value[2].value }</Table.Cell>
                              <Table.Cell>{ item[9].value[0].value }</Table.Cell>
                              <Table.Cell>{ item[9].value[1].value }</Table.Cell>
                              <Table.Cell singleLine>
                                <Button 
                                  icon 
                                  color={ this.state.detail.open && this.state.detail.key === index ? 'orange' : 'green' }
                                  title='details'
                                  onClick= { () => this.showDetail(!this.state.detail.open, index) }
                                > 
                                  <Icon name={ this.state.detail.open && this.state.detail.key === index ? 'compress' : 'expand' } /> 
                                </Button>
                                <Button 
                                  title='edit'
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
                                <Button title='hapus' icon color='red'> <Icon name='trash' /> </Button>
                              </Table.Cell>
                            </Table.Row>
                            { this.state.detail.open && this.state.detail.key === index &&
                            <Table.Row key={index}>
                              <Table.Cell colSpan="8">
                                <Segment inverted color='blue'>
                                  <Table celled>
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.HeaderCell rowSpan='2'>Kategori Risiko</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Sistem Pengendalian Yang Dilaksanakan</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Kemungkinan</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Dampak</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>LR</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Prioritas Risiko</Table.HeaderCell>
                                        <Table.HeaderCell colSpan='3'>Risiko Residual Harapan</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Keputusan mitigasi</Table.HeaderCell>
                                        <Table.HeaderCell colSpan='2'>Indikator Risiko Utama (IRU)</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Aksi</Table.HeaderCell>
                                      </Table.Row>
                                      <Table.Row>
                                        <Table.HeaderCell>LK</Table.HeaderCell>
                                        <Table.HeaderCell>LD</Table.HeaderCell>
                                        <Table.HeaderCell>LR</Table.HeaderCell>
                                        <Table.HeaderCell>Nama</Table.HeaderCell>
                                        <Table.HeaderCell>Batasan Nilai</Table.HeaderCell>
                                      </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                      <Table.Row>
                                        <Table.Cell>{item[5].value}</Table.Cell>
                                        <Table.Cell>{item[6].value}</Table.Cell>
                                        <Table.Cell>{item[7].value}</Table.Cell>
                                        <Table.Cell>{item[8].value}</Table.Cell>
                                        <Table.Cell>{item[10].value}</Table.Cell>
                                        <Table.Cell>{item[11].value}</Table.Cell>
                                        <Table.Cell>{item[12].value[0].value}</Table.Cell>
                                        <Table.Cell>{item[12].value[1].value}</Table.Cell>
                                        <Table.Cell>{item[12].value[2].value}</Table.Cell>
                                        <Table.Cell>{item[13].value}</Table.Cell>
                                        <Table.Cell>{item[14].value[0].value}</Table.Cell>
                                        <Table.Cell>{item[14].value[1].value}</Table.Cell>
                                        <Table.Cell>
                                          <Button 
                                            title='edit'
                                            icon 
                                            color='blue'
                                          >
                                            <Icon name='edit outline' />
                                          </Button>
                                        </Table.Cell>
                                      </Table.Row>
                                    </Table.Body>
                                  </Table>
                                </Segment>
                              </Table.Cell>
                            </Table.Row>
                            }
                            
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