import React, { Component } from 'react';
import {
  Modal,
} from 'semantic-ui-react';
import FormRisiko from './form-risiko';

class ModalRisiko extends Component {
  constructor(props) {
    super(props);

    this.state = {
      utama: {
        nomor: '',
        awal: '',
        akhir: '',
        kejadian: '',
        sasaran_organisasi_id: ''
      },
      details: {}
    }
  }

  render() {
    const { open, onClose, method } = this.props;
    let { mainTable, labels } = this.props;

    if(method === 'post') {
      mainTable = this.state.utama;
    }

    return (
      <Modal
        size="small"
        open={open}
        onClose={ () => onClose(false) }
      >
        <Modal.Header>Daftar Risiko</Modal.Header>
        <Modal.Content>
          <FormRisiko 
            mainTable={mainTable}
            labels={labels}
            method={method}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalRisiko;