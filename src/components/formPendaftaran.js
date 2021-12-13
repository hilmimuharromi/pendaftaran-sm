import React, { useState, useEffect } from 'react';
import {
  Grid,
  Form,
  Input,
  Divider,
  Button,
} from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import axios from 'axios';
function FormPendaftaran() {
  const [gender, setGender] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKabKota, setListKabKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([])
  const [listKelurahan, setListKelurahan] = useState([])
  const [values, setValues] = useState({});

  useEffect(() => {
    const getProvinsi = () => {
      axios
        .get('http://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then((res) => {
          console.log('resss', res.data.provinsi);
          const optionsProvinsi = res.data.provinsi.map((item) => {
            item.key = item.id;
            item.value = item.id;
            item.text = item.nama;
            return item;
          });
          setListProvinsi(optionsProvinsi);
        });
    };
    getProvinsi();
  }, []);

  useEffect(() => {
    const getKabupatenKota = () => {
      axios
        .get(
          `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${values.provinsi}`
        )
        .then((res) => {
          console.log('resss', res.data.kota_kabupaten);
          const optionsKotaKabupaten = res.data.kota_kabupaten.map((item) => {
            item.key = item.id;
            item.value = item.id;
            item.text = item.nama;
            return item;
          });
          setListKabKota(optionsKotaKabupaten);
        });
    };
    if (values.provinsi) {
      getKabupatenKota();
    }
  }, [values.provinsi]);


  useEffect(() => {
    const getKecamatan = () => {
      axios
        .get(
          ` http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${values.kabupatenKota}`
        )
        .then((res) => {
          console.log('resss', res.data.kecamatan);
          const optionsKotaKecamatan = res.data.kecamatan.map((item) => {
            item.key = item.id;
            item.value = item.id;
            item.text = item.nama;
            return item;
          });
          setListKecamatan(optionsKotaKecamatan);
        });
    };
    if (values.kabupatenKota) {
      getKecamatan();
    }
  }, [values.kabupatenKota])

  useEffect(() => {
    const getKelurahan = () => {
      axios
        .get(
          ` http://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${values.kecamatan}`
        )
        .then((res) => {
          console.log('resss kelurahan', res.data);
          const optionsKotaKelurahan = res.data.kelurahan.map((item) => {
            item.key = item.id;
            item.value = item.id;
            item.text = item.nama;
            return item;
          });
          setListKelurahan(optionsKotaKelurahan);
        });
    };
    if (values.kecamatan) {
      getKelurahan();
    }
  }, [values.kecamatan])



  return (
    <Form>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} computer={8}>
            <h2>Data WaLi Santri</h2>
            <Divider />
            <Form.Input
              //   error={{ content: 'Please enter your first name', pointing: 'below' }}
              fluid
              label='Nama Wali Calon Santri'
              placeholder='First name'
              id='form-input-first-name'
            />
            <Form.Input
              //   error={{ content: 'Please enter your first name', pointing: 'below' }}
              fluid
              label='No KTP Wali'
              placeholder='16 Digit No KTP Wali'
              id='form-input-first-name'
            />
            <Form.Input
              //   error={{ content: 'Please enter your first name', pointing: 'below' }}
              fluid
              label='No Whatsapp'
              placeholder='08*******'
              id='form-input-first-name'
            />
            <Form.Input
              id='form-input-control-error-email'
              control={Input}
              label='Email'
              placeholder='user@mail.com'
              //    error={{
              //      content: 'Please enter a valid email address',
              //      pointing: 'below',
              //    }}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <h2>Data Calon Santri</h2>
            <Divider />
            <Form.Input
              //   error={{ content: 'Please enter your first name', pointing: 'below' }}
              fluid
              label='Nama Calon Santri'
              placeholder='Nama Calon Santri'
              id='form-input-first-name'
            />
            <Form.Input
              //   error={{ content: 'Please enter your first name', pointing: 'below' }}
              fluid
              label='NIK / No KIA'
              placeholder='Nomor NIK/KIA Calon Santri'
              id='form-input-first-name'
            />

            <Form.Group grouped>
              <label>Jenis Kelamin</label>
              <div style={{ display: 'flex' }}>
                <Form.Radio
                  label='Laki-laki'
                  value='laki-laki'
                  checked={gender === 'laki-laki'}
                  onChange={(e, { value }) => setGender(value)}
                />
                <Form.Radio
                  label='Perempuan'
                  value='perempuan'
                  checked={gender === 'perempuan'}
                  onChange={(e, { value }) => setGender(value)}
                />
              </div>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='First name' placeholder='First name' />
              <Form.Input fluid label='Last name' placeholder='Last name' />
            </Form.Group>
            <DatePicker onChange={setTanggalLahir} value={tanggalLahir}
             calendarAriaLabel="Toggle calendar"
             clearAriaLabel="Clear value"
             dayAriaLabel="Day"
             monthAriaLabel="Month"
             nativeInputAriaLabel="Date"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <h2>Data Alamat</h2>
      <Divider />
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column mobile={16} computer={8}>
            <Form.Select
              fluid
              label='Jenis Alamat'
              options={[{ key: 'Rumah', value: 'Rumah', text: 'Rumah' }]}
              placeholder='Jenis Alamat'
            />
            <Form.TextArea label='Alamat' placeholder='Alamat .....' />
            <Grid.Row>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='RT'
                  placeholder='RT'
                  onChange={(e, data) =>
                    setValues({ ...values, rt: data.value })
                  }
                />

                <Form.Input
                  fluid
                  label='RW'
                  placeholder='RW'
                  onChange={(e, data) =>
                    setValues({ ...values, rw: data.value })
                  }
                />
              </Form.Group>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <Form.Select
              fluid
              label='Provinsi'
              options={listProvinsi}
              placeholder='Provinsi'
              onChange={(e, data) =>
                setValues({ ...values, provinsi: data.value })
              }
            />
            <Grid.Row>
              <Form.Group widths='equal'>
                <Form.Select
                  fluid
                  label='Kabupaten/Kota'
                  options={listKabKota}
                  placeholder='Kabupaten/Kota'
                  onChange={(e, data) =>
                    setValues({ ...values, kabupatenKota: data.value })
                  }
                />

                <Form.Select
                  fluid
                  label='Kecamatan'
                  options={listKecamatan}
                  placeholder='Kecamatan'
                  onChange={(e, data) =>
                    setValues({ ...values, kecamatan: data.value })
                  }
                />
              </Form.Group>
            </Grid.Row>

            <Grid.Row>
              <Form.Group widths='equal'>
                <Form.Select
                  fluid
                  label='Kelurahan'
                  options={listKelurahan}
                  placeholder='Kelurahan'
                  onChange={(e, data) =>
                    setValues({ ...values, kelurahan: data.value })
                  }
                />

                <Form.Input
                  fluid
                  label='Kode Pos'
                  options={[{ key: 'Rumah', value: 'Rumah', text: 'Rumah' }]}
                  placeholder='Kode Pos'
                />
              </Form.Group>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button primary>Submit</Button>
    </Form>
  );
}

export default FormPendaftaran;
