import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Table, 
  Button, 
  Icon,
  Grid,
  Segment,
  Header
} from 'semantic-ui-react';
import { FetchReferensi, SubmitReferensi } from '../../actions/referensi';
import ModalReferensi from './modal-referensi';

class Referensi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalEdit: false,
      formData: {},
      kategori: '',
      method: ''
    }
  }

  componentDidMount = () => {
    this.props.fetchReferensi();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.referensi.notif !== this.props.referensi.notif) {
      this.props.fetchReferensi();
    }
  }

  show = (open, data, kategori, method) => {
    this.setState({
      modalEdit: open,
      formData: data,
      kategori,
      method
    })
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
                  onClick={() => this.show(true, {}, 'kemungkinan', 'post')}
                >
                  <Icon name='plus' />
                  Tambah
                </Button>
                <Header as='h3'>
                  <Icon name='table' />
                  <Header.Content>Referensi Kemungkinan</Header.Content>
                </Header>
                <Table celled sortable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell rowSpan='2'>Level</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>Deskripsi Level</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>Low Tolerance</Table.HeaderCell>
                      <Table.HeaderCell colSpan='2'>Kriteria Kemungkinan</Table.HeaderCell>
                      <Table.HeaderCell rowSpan='2'>Aksi</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell>Jumlah</Table.HeaderCell>
                      <Table.HeaderCell>Persentase</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    { this.props.referensi.kemungkinan.data.map( (item, index) => {
                        return(
                          <Table.Row key={index}>
                            <Table.Cell>{ item.level }</Table.Cell>
                            <Table.Cell>{ item.level_desc }</Table.Cell>
                            <Table.Cell>{ item.low_tolerance }</Table.Cell>
                            <Table.Cell>{ item.jumlah }</Table.Cell>
                            <Table.Cell>{ item.persentase }</Table.Cell>
                            <Table.Cell>
                              <Button 
                                icon 
                                color='blue'
                                onClick={() => this.show(true, item, 'kemungkinan', 'put')}
                              >
                                <Icon name='edit' />
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        )
                      }) 
                    }
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
                <Segment padded>
                  <Button 
                    icon 
                    labelPosition='left' 
                    floated='right' 
                    positive 
                    size='small'
                    onClick={() => this.show(true, {}, 'dampak', 'post')}
                  >
                    <Icon name='plus' />
                    Tambah
                  </Button>
                  <Header as='h3'>
                    <Icon name='table' />
                    <Header.Content>Referensi Dampak</Header.Content>
                  </Header>
                  <Table celled sortable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Level</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Deskripsi Level</Table.HeaderCell>
                        <Table.HeaderCell colSpan='2'>Beban Keuangan Negara</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Penurunan Reputasi</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Sanksi</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Kecelakaan Kerja</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Gangguan Terhadap Layanan Organisasi</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Penurunan Kinerja</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Aksi</Table.HeaderCell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>Fraud</Table.HeaderCell>
                        <Table.HeaderCell>Non Fraud</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      { this.props.referensi.dampak.data.map( (item, index) => {
                          return(
                            <Table.Row key={index}>
                              <Table.Cell>{ item.level }</Table.Cell>
                              <Table.Cell>{ item.level_desc }</Table.Cell>
                              <Table.Cell>{ item.fraud }</Table.Cell>
                              <Table.Cell>{ item.non_fraud }</Table.Cell>
                              <Table.Cell>{ item.reputasi }</Table.Cell>
                              <Table.Cell>{ item.sanksi }</Table.Cell>
                              <Table.Cell>{ item.kecelakaan }</Table.Cell>
                              <Table.Cell>{ item.gangguan }</Table.Cell>
                              <Table.Cell>{ item.kinerja }</Table.Cell>
                              <Table.Cell>
                                <Button 
                                  icon 
                                  color='blue' 
                                  onClick={() => this.show(true, item, 'dampak', 'put')}
                                >
                                  <Icon name='edit' />
                                </Button>
                              </Table.Cell>
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
        <ModalReferensi
          open={this.state.modalEdit}
          onClose={this.show}
          formData={this.state.formData}
          kategori={this.state.kategori}
          method={this.state.method}
          {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    referensi: state.referensi
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReferensi: () => dispatch(FetchReferensi()),
    submitReferensi: (method, kategori, referensi) => dispatch(SubmitReferensi(method, kategori, referensi))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Referensi);