import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Input,
  TextArea
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { toast } from 'react-semantic-toasts/build/toast';
import { FetchSasaran } from '../../actions/sasaran-organisasi';

class FormRisiko extends Component {
  componentDidMount = () => {
    this.props.fetchSasaran();
  }

  render() {
    const { nomor, sasaran_organisasi_id, kejadian, awal, akhir } = this.props.labels;

    return (
      <Formik
        enableReinitialize={true}
        initialValues = {this.props.mainTable}
      >
        {({values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <Form>
            <Form.Field>
              <label> {nomor} </label>
              <Input 
                placeholder="Nomor"
                type="text" 
                name="nomor"
                value={values.nomor}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
            <Form.Field>
              <label> {sasaran_organisasi_id} </label>
              <select 
                name='sasaran_organisasi_id'
                onChange={handleChange}
                onBlur={handleBlur} 
                value={values.sasaran_organisasi_id}
              >
                <option>-- Pilih sasaran organisasi --</option>
                {
                  this.props.sasaran.data.map( (item, index) => {
                    return (
                      <option 
                        value={item._id} 
                        key={index}
                      >{item.desc}</option>
                  )})
                }
              </select>
            </Form.Field>
            <Form.Field>
              <label> {kejadian} </label>
              <TextArea 
                placeholder="Kejadian risiko..." 
                name="kejadian" 
                value={values.kejadian}
              />
            </Form.Field>
            <Form.Field>
              <label>Proyeksi Besaran Risiko</label>
              <Input 
                placeholder="Awal tahun"
                label={awal}
                type="text" 
                name="awal"
                value={values.awal}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input 
                placeholder="Akhir tahun"
                label={akhir}
                type="text" 
                name="akhir"
                value={values.akhir}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Field>
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
    )
  }
}

const mapStateToProps = state => {
  return {
    sasaran: state.sasaran
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSasaran : () => dispatch(FetchSasaran())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormRisiko);