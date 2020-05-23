import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  Form
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { toast } from 'react-semantic-toasts/build/toast';

class ModalReferensi extends Component {
  transform(kategori, formData) {
    const toArray = [];

    toArray.push({ name: 'level', label: 'Level', value: formData.level });
    toArray.push({ name: 'level_desc', label: 'Deskripsi Level', value: formData.level_desc });

    if(kategori === 'kemungkinan') {
      toArray.push({ name: 'low_tolerance', label: 'Low Tolerance', value: formData.low_tolerance });
      toArray.push({ name: 'jumlah', label: 'Jumlah Kemungkinan', value: formData.jumlah });
      toArray.push({ name: 'persentase', label: 'Persentase Kemungkinan', value: formData.persentase });

      return toArray;
    }

    toArray.push({ name: 'sanksi', label: 'Sanksi', value: formData.sanksi });
    toArray.push({ name: 'reputasi', label: 'Penurunan Reputasi', value: formData.reputasi });
    toArray.push({ name: 'kinerja', label: 'Penurunan Kinerja', value: formData.kinerja });
    toArray.push({ name: 'kecelakaan', label: 'Kecelakaan Kerja', value: formData.kecelakaan });
    toArray.push({ name: 'gangguan', label: 'Gangguan Layanan', value: formData.gangguan });
    toArray.push({ name: 'fraud', label: 'Fraud', value: formData.fraud });
    toArray.push({ name: 'non_fraud', label: 'Non Fraud', value: formData.non_fraud });

    return toArray;
  }

  initialValues(kategori) {
    let values = {
      kemungkinan: {
        level: '',
        level_desc: '',
        jumlah: '',
        persentase: '',
        low_tolerance: ''
      },
      dampak: {
        level: '',
        level_desc: '',
        fraud: '',
        non_fraud: '',
        reputasi: '',
        sanksi: '',
        kecelakaan: '',
        gangguan: '',
        kinerja: ''
      }
    }

    return values[kategori];
  }

  render() {
    const { open, onClose, kategori, method, submitReferensi } = this.props;
    let { formData } = this.props;

    if(open && method === 'post') {
      formData = this.initialValues(kategori);
    }

    const cloneFormData = Object.assign({}, formData);

    delete cloneFormData._id;
    delete cloneFormData.kppn;

    let transformedFormData = {};

    if(open) {
      transformedFormData = this.transform(kategori, cloneFormData);
    }

    return(
      <Modal
        size="small"
        open={open}
        onClose={() => {
          onClose(false);
          // this.props.history.push('/referensi');
        }}
      >
        <Modal.Header>Referensi {kategori}</Modal.Header>
          <Modal.Content>
            <Formik
              enableReinitialize={true}
              initialValues = {cloneFormData}
              onSubmit= {(values, { setSubmitting }) => {
                submitReferensi(method, kategori, values).then( () => {
                  toast({
                    type: this.props.referensi.notif.type,
                    title: this.props.referensi.notif.title,
                    time: 5000
                  })
                });
              }}
            >
              {({values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
                <Form>
                  {
                    open ? transformedFormData.map( (item, index) => {
                      return (
                        <Form.Field key={index}>
                          <label>{item.label}</label>
                          <input 
                            placeholder={item.label} 
                            type="text" 
                            name={item.name}
                            value={values[item.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Form.Field>
                      );
                    }) : null
                  }
                  <Button
                    type="submit"
                    color="blue"
                    onClick={handleSubmit}
                  >
                    Submit        
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    referensi: state.referensi
  }
}

export default connect(
  mapStateToProps,
  null
)(ModalReferensi);