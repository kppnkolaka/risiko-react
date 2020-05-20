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
import { FetchReferensi } from '../actions/referensi';

class Referensi extends Component {
  componentDidMount = () => {
    this.props.fetchReferensi();
  }

  render() {
    return (
      <Grid divided='vertically' padded>
        <Grid.Row>
          <Grid.Column>
            <Segment padded>
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
                    <Table.HeaderCell colSpan='2'>Kriteria</Table.HeaderCell>
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
                          <Table.Cell>{ item.kriteria.jumlah }</Table.Cell>
                          <Table.Cell>{ item.kriteria.persentase }</Table.Cell>
                          <Table.Cell>
                            <Button icon color='blue'>
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
                      <Table.HeaderCell rowSpan='2'>Sanksi pidana, perdata, dan/atau administratif</Table.HeaderCell>
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
                            <Table.Cell>{ item.area_dampak.fraud }</Table.Cell>
                            <Table.Cell>{ item.area_dampak.non_fraud }</Table.Cell>
                            <Table.Cell>{ item.reputasi }</Table.Cell>
                            <Table.Cell>{ item.sanksi }</Table.Cell>
                            <Table.Cell>{ item.kecelakaan }</Table.Cell>
                            <Table.Cell>{ item.gangguan }</Table.Cell>
                            <Table.Cell>{ item.kinerja }</Table.Cell>
                            <Table.Cell>
                              <Button icon color='blue'>
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
    fetchReferensi: () => dispatch(FetchReferensi())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Referensi);