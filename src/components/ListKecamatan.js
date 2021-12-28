import React, { useEffect} from 'react'
import {
    Select,
  } from "formik-semantic-ui-react";
import axios from 'axios'
function ListKecamatan({values, setFieldValue, listKecamatan, setListKecamatan}) {

  useEffect(() => {
    const getKecamatan = () => {
      setFieldValue('kecamatan', '')
      axios
        .get(
          ` https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${values.kabupaten}`
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
    if (values.kabupaten) {
      getKecamatan();
    }
    //eslint-disable-next-line
  }, [values.kabupaten])


    return (
        <Select
        label="Kecamatan"
            id="kecamatan"
            errorPrompt
            name="kecamatan"
            selectOnBlur={false}
            clearable
            placeholder="Pilih Kecamatan"
            options={listKecamatan}
          />
    )
}

export default ListKecamatan
