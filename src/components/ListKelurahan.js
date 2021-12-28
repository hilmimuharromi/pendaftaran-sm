import React, { useEffect} from 'react'
import {
    Select,
  } from "formik-semantic-ui-react";
import axios from 'axios'
function ListKelurahan({values, setFieldValue, listKelurahan, setListKelurahan}) {

  useEffect(() => {
    const getKelurahan = () => {
      setFieldValue('kelurahan', '')

      axios
        .get(
          ` https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${values.kecamatan}`
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
    //eslint-disable-next-line
  }, [values.kecamatan]);


    return (
        <Select
        label="Kelurahan"
            id="kelurahan"
            errorPrompt
            name="kelurahan"
            selectOnBlur={false}
            clearable
            placeholder="Pilih Kelurahan"
            options={listKelurahan}
          />
    )
}

export default ListKelurahan
