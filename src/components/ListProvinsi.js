import React, {  useEffect } from 'react';
import { Select } from 'formik-semantic-ui-react';
import axios from 'axios';
function ListProvinsi({listProvinsi, setListProvinsi}) {
  // const [listProvinsi, setListProvinsi] = useState([]);

  useEffect(() => {
    const getProvinsi = () => {
      axios
        .get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
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
    //eslint-disable-next-line
  }, []);

  return (
    <Select
      label='Provinsi'
      id='Provinsi'
      errorPrompt
      errorConfig={{
        prompt: false,
        basic: false,
        color: 'green',
        pointing: 'below',
      }}
      name='provinsi'
      selectOnBlur={false}
      clearable
      placeholder='Pilih Provinsi'
      options={listProvinsi}
    />
  );
}

export default ListProvinsi;
