import React, { useState, useEffect } from 'react';
import { Grid, Divider, GridRow } from 'semantic-ui-react';
import {
  Form,
  Input,
  Select,
  SubmitButton,
  TextArea,
} from 'formik-semantic-ui-react';
import Notif from './Notif'
import axios from 'axios';
import { Formik, } from 'formik';
import * as Yup from 'yup';
import {  FormGroup } from 'semantic-ui-react';
// import Upload from './upload'
// import upload from './upload';
import ListProvinsi from './ListProvinsi';
import ListKabupaten from './ListKabupaten';
import ListKecamatan from './ListKecamatan';
import ListKelurahan from './ListKelurahan';
import { toast } from 'react-toastify';

function FormPendaftaran() {
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKabupaten, setListKabupaten] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);
  const [listKelurahan, setListKelurahan] = useState([]);
  const [notifData, setNotifData] = useState({
    success: true,
    header: 'Sukses Daftar',
    content: 'Pendaftaran Anda Sukses dan Mohon Segera Konfirmasi ke nomer tertera di bagian bawah'
  })

  const initialValueTes = {
    namaLengkap: 'Ahmad Kevin',
    namaPanggilan: 'Kevin',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2000-10-01',
    email: 'emhaemhaem@gmail.com',
    provinsi: 'Dki Jakarta',
    kabupaten: 'Jakarta Timur',
    kecamatan: 'Cakung',
    kelurahan: 'Jatinegara',
    rt: '04',
    rw: '06',
    detailAlamat: 'Jalan Pengarengan',

    nomorHPSantri: '0811626262',
    namaAyah: 'Santoso',
    namaIbu: 'Santi',
    pekerjaanAyah: 'Pegawai Swasta',
    pekerjaanIbu: 'IRT',
    nomorHPOrtu: '0210303003',
    jenjangPendidikan: 'SMK',
    asalSekolah: 'SMP ALazhar',
    nomorTeleponAsalSekolah: '08020202',
    ijazah: '',
    kk: '',
    pasFoto: '',
  };

  const initialValue = {
    namaLengkap: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    email: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    rt: '',
    rw: '',
    detailAlamat: '',
    nomorHPSantri: '',
    namaAyah: '',
    namaIbu: '',
    pekerjaanAyah: '',
    pekerjaanIbu: '',
    nomorHPOrtu: '',
    jenjangPendidikan: '',
    asalSekolah: '',
    nomorTeleponAsalSekolah: '',
    ijazah: '',
    kk: '',
    pasFoto: '',
  };

  const validationScheme = Yup.object({
    namaLengkap: Yup.string()
      .min(2, 'Mininum 2 characters')
      .required('Wajib Diisi!'),
    namaPanggilan: Yup.string()
      .min(2, 'Mininum 2 characters')
      .max(15, 'Maximum 15 characters')
      .required('Wajib Diisi!'),
    jenisKelamin: Yup.string().required('Wajib Di isi'),
    tempatLahir: Yup.string().required('Wajib Di isi'),
    tanggalLahir: Yup.string().required('Wajib Di isi'),
    nomorHPSantri: Yup.string().required('Wajib Di isi'),
    email: Yup.string().email('Invalid email address').required('Wajib Diisi!'),
    namaAyah: Yup.string().required('Wajib Di isi'),
    namaIbu: Yup.string().required('Wajib Di isi'),
    pekerjaanAyah: Yup.string().required('Wajib Di isi'),
    pekerjaanIbu: Yup.string().required('Wajib Di isi'),
    nomorHPOrtu: Yup.string().required('Wajib Di isi'),
    provinsi: Yup.string().required('Wajib Di isi'),
    kabupaten: Yup.string().required('Wajib Di isi'),
    kecamatan: Yup.string().required('Wajib Di isi'),
    kelurahan: Yup.string().required('Wajib Di isi'),
    rt: Yup.string().required('Wajib Di isi'),
    rw: Yup.string().required('Wajib Di isi'),
    detailAlamat: Yup.string().required('Wajib Di isi'),
    jenjangPendidikan: Yup.string().required('Wajib Di isi'),
    asalSekolah: Yup.string().required('Wajib Di isi'),
    nomorTeleponAsalSekolah: Yup.string().required('Wajib Di isi'),
    ijazah: Yup.mixed().required('A file is required'),
    kk: Yup.mixed().required('A file is required'),
    pasFoto: Yup.mixed().required('A file is required'),

    // .test(
    //   "fileSize",
    //   "File too large",
    //   value => value && value.size <= FILE_SIZE
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   value => value && ijazahFormat.includes(value.type)
    // )
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    setIsSubmitting(true);

    const provinsi = listProvinsi.find((item) => item.id === values.provinsi);
    const kabupaten = listKabupaten.find(
      (item) => item.id === values.kabupaten
    );
    const kecamatan = listKecamatan.find(
      (item) => item.id === values.kecamatan
    );
    const kelurahan = listKelurahan.find(
      (item) => item.id === values.kelurahan
    );


  
    const formData = new FormData();
    formData.append('ijazah', values.ijazah);
    formData.append('kk', values.kk);
    formData.append('pasFoto', values.pasFoto);
   

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const {
      jenjangPendidikan,
      namaLengkap,
      namaPanggilan,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      email,
      nomorHPSantri,
      namaAyah,
      pekerjaanAyah,
      namaIbu,
      pekerjaanIbu,
      nomorHPOrtu,
      detailAlamat,
      rt, rw,
      asalSekolah,
      nomorTeleponAsalSekolah
    } = values;

    const data = [
      jenjangPendidikan, 
      namaLengkap,
      namaPanggilan,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      email,
      nomorHPSantri,
      namaAyah,
      pekerjaanAyah,
      namaIbu,
      pekerjaanIbu,
      nomorHPOrtu,
      provinsi.nama,
      kabupaten.nama,
      kecamatan.nama,
      kelurahan.nama,
      `${detailAlamat} - RT ${rt} / RW ${rw}`,
      asalSekolah,
      nomorTeleponAsalSekolah
    ]

    formData.append(
      'data',
      JSON.stringify(data)
    );

    

    axios.post('http://localhost:4000', formData, config).then((res) => {
      console.log('dataa', res)
      resetForm()
      toast.success('Pendaftaran Berhasil');
    }).catch((err) => {
      console.log('error post', err)
      toast.error('pendaftaran Gagal, cek data anda');
    }).finally(() => {
      setIsSubmitting(false)
    })

  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={validationScheme}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors }) => (
          <Form size='large'>
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={16} computer={8}>
                  <h2>Data Santri</h2>
                  <Divider />
                  <Input
                    id='input-nama-lengkap'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: false,
                      color: 'green',
                      pointing: 'below',
                    }}
                    name='namaLengkap'
                    label='Nama Lengkap'
                    placeholder='Nama Lengkap'
                  />
                  <Input
                    id='input-nama-panggilan'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: true,
                      color: 'blue',
                    }}
                    name='namaPanggilan'
                    label='Nama Panggilan'
                    placeholder='Nama Panggilan'
                  />
                  <Select
                    id='jenis-kelamin'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: true,
                      color: 'blue',
                    }}
                    name='jenisKelamin'
                    selectOnBlur={false}
                    label='Jenis Kelamin'
                    clearable
                    placeholder='Jenis Kelamin'
                    options={[
                      {
                        key: '1',
                        value: 'Laki-laki',
                        text: 'Laki-laki',
                      },
                      {
                        key: '2',
                        value: 'Perempuan',
                        text: 'Perempuan',
                      },
                    ]}
                  />
                  <FormGroup>
                    <Input
                      id='input-tempat-lahir'
                      errorPrompt
                      errorConfig={{
                        prompt: false,
                        basic: false,
                        color: 'green',
                        pointing: 'below',
                      }}
                      name='tempatLahir'
                      label='Tempat Lahir'
                      placeholder='Tempat Lahir'
                    />
                    <Input
                      id='input-tanggal-lahir'
                      errorPrompt
                      type='date'
                      errorConfig={{
                        prompt: false,
                        basic: false,
                        color: 'green',
                        pointing: 'below',
                      }}
                      name='tanggalLahir'
                      label='Tanggal Lahir'
                      placeholder='Tanggal Lahir'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      id='input-nomor-hp'
                      type='number'
                      errorPrompt
                      errorConfig={{
                        prompt: false,
                        basic: true,
                        color: 'blue',
                      }}
                      name='nomorHPSantri'
                      label='Nomor HP/Whastapp'
                      placeholder='Nomor HP/Whastapp'
                    />
                    <Input
                      id='input-email'
                      errorPrompt
                      name='email'
                      label='Email'
                      placeholder='Email'
                    />
                  </FormGroup>
                </Grid.Column>
                <Grid.Column mobile={16} computer={8}>
                  <h2>Data Orang Tua</h2>
                  <Divider />
                  <Input
                    id='input-nama-ayah'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: false,
                      color: 'green',
                      pointing: 'below',
                    }}
                    name='namaAyah'
                    label='Nama Ayah'
                    placeholder='Nama Ayah'
                  />
                  <Input
                    id='input-pekerjaan-ayah'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: false,
                      color: 'green',
                      pointing: 'below',
                    }}
                    name='pekerjaanAyah'
                    label='Pekerjaan Ayah'
                    placeholder='Pekerjaan Ayah'
                  />
                  <Input
                    id='input-nama-ibu'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: false,
                      color: 'green',
                      pointing: 'below',
                    }}
                    name='namaIbu'
                    label='Nama Ibu'
                    placeholder='Nama Ibu'
                  />
                  <Input
                    id='input-pekerjaan-ibu'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: false,
                      color: 'green',
                      pointing: 'below',
                    }}
                    name='pekerjaanIbu'
                    label='Pekerjaan Ibu'
                    placeholder='Pekerjaan Ibu'
                  />
                  <Input
                    id='input-nomor-hp-orang-tua'
                    type='number'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: true,
                      color: 'blue',
                    }}
                    name='nomorHPOrtu'
                    label='Nomor HP/Whastapp Orang Tua'
                    placeholder='Nomor HP/Whastapp Orang Tua'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <h2>Data Alamat</h2>
            <Divider />
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column mobile={16} computer={8}>
                  <ListProvinsi
                    setFieldValue={setFieldValue}
                    listProvinsi={listProvinsi}
                    setListProvinsi={setListProvinsi}
                  />
                  <ListKabupaten
                    setFieldValue={setFieldValue}
                    values={values}
                    listKabupaten={listKabupaten}
                    setListKabupaten={setListKabupaten}
                  />
                  <ListKecamatan
                    setFieldValue={setFieldValue}
                    values={values}
                    listKecamatan={listKecamatan}
                    setListKecamatan={setListKecamatan}
                  />
                </Grid.Column>
                <Grid.Column mobile={16} computer={8}>
                  <ListKelurahan
                    setFieldValue={setFieldValue}
                    values={values}
                    listKelurahan={listKelurahan}
                    setListKelurahan={setListKelurahan}
                  />
                  <FormGroup>
                    <Input
                      id='input-rt'
                      errorPrompt
                      errorConfig={{
                        prompt: false,
                        basic: false,
                        color: 'green',
                        pointing: 'below',
                      }}
                      name='rt'
                      label='RT'
                      placeholder='RT'
                    />
                    <Input
                      id='input-rw'
                      errorPrompt
                      errorConfig={{
                        prompt: false,
                        basic: false,
                        color: 'green',
                        pointing: 'below',
                      }}
                      name='rw'
                      label='RW'
                      placeholder='RW'
                    />
                  </FormGroup>
                  <TextArea
                    id='input-detail-alamat'
                    errorPrompt
                    errorConfig={{
                      prompt: false,
                      basic: false,
                      color: 'green',
                      pointing: 'below',
                    }}
                    name='detailAlamat'
                    label='Detail Alamat (nama Jalan/no rumah)'
                    placeholder='Detail Alamat'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <h2>Data Persyaratan</h2>
            <Divider />
            <Grid.Row>
              <Grid.Column mobile={16} computer={8}>
                <Select
                  id='jenjang-pendidikan'
                  errorPrompt
                  errorConfig={{
                    prompt: false,
                    basic: true,
                    color: 'blue',
                  }}
                  name='jenjangPendidikan'
                  selectOnBlur={false}
                  label='Jenjang Pendidikan Yang Dipilih'
                  clearable
                  placeholder='Jenjang Pendidikan'
                  options={[
                    {
                      key: '1',
                      value: 'Mts',
                      text: 'Mts',
                    },
                    {
                      key: '2',
                      value: 'SMP IT',
                      text: 'SMP IT',
                    },
                    {
                      key: '3',
                      value: 'SMK',
                      text: 'SMK',
                    },
                  ]}
                />
              </Grid.Column>
              <Grid.Column mobile={16} computer={8}>
                <Input
                  id='asal-sekolah'
                  errorPrompt
                  name='asalSekolah'
                  label='Asal Sekolah'
                  placeholder='Asal Sekolah'
                />
                <Input
                  id='nomor-tlp-asal-sekolah'
                  errorPrompt
                  name='nomorTeleponAsalSekolah'
                  label='Nomor Telepon Asal Sekolah'
                  placeholder='Nomor Telepon Asal Sekolah'
                />
              </Grid.Column>
            </Grid.Row>
            <p>Ijazah</p>
            <input
              style={{ borderColor: errors.ijazah && 'red' }}
              id='input-ijazah'
              type='file'
              errorPrompt
              errorConfig={{
                prompt: false,
                basic: false,
                color: 'green',
                pointing: 'below',
              }}
              name='ijazah'
              label='Ijazah'
              placeholder='Ijazah'
              onChange={(e) => {
                const formData = new FormData();
                formData.append('name', 'ijazah');
                formData.append('file', e.target.files[0]);
                console.log('onchange', e.target.files[0]);
                setFieldValue('ijazah', e.target.files[0]);
              }}
            />
            <p>KK</p>

            <input
              style={{ borderColor: errors.kk && 'red' }}
              id='input-kk'
              type='file'
              errorPrompt
              errorConfig={{
                prompt: false,
                basic: false,
                color: 'green',
                pointing: 'below',
              }}
              name='kk'
              label='kartu Keluarga'
              placeholder='kartu Keluarga'
              onChange={(e) => {
                const formData = new FormData();
                formData.append('name', 'kk');
                formData.append('file', e.target.files[0]);
                console.log('onchange', e.target.files[0]);
                setFieldValue('kk', e.target.files[0]);
              }}
            />
            <p>Pas Foto</p>

            <input
              style={{ borderColor: errors.pasFoto && 'red', marginBottom: 5 }}
              id='input-pasFoto'
              type='file'
              errorPrompt
              errorConfig={{
                prompt: false,
                basic: false,
                color: 'green',
                pointing: 'below',
              }}
              name='pasFoto'
              label='Pas Foto'
              placeholder='Pas Foto'
              onChange={(e) => {
                const formData = new FormData();
                formData.append('name', 'pasFoto');
                formData.append('file', e.target.files[0]);
                console.log('onchange', e.target.files[0]);
                setFieldValue('pasFoto', e.target.files[0]);
              }}
            />

              <Notif
              reset={() => setNotifData('')}
              success={true}
                {...notifData}
              />
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10, marginTop: 10}}>
            <SubmitButton primary fluid loading={isSubmitting} width={8}>
              Submit
            </SubmitButton>
      </div>

            
            {/* <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10, marginTop: 10}}>
                {
                  !notifData && 

                }
              </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormPendaftaran;
