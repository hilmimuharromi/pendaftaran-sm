import React, {useState, useEffect} from 'react'
import {
    Select,
  } from "formik-semantic-ui-react";
import axios from 'axios'
function ListKabupaten({values, setFieldValue, listKabupaten, setListKabupaten}) {

  useEffect(() => {
    const getKabupatenKota = () => {
      setFieldValue('kabupaten', '')
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${values.provinsi}`
        )
        .then((res) => {
          console.log('resss', res.data.kota_kabupaten);
          const optionsKotaKabupaten = res.data.kota_kabupaten.map((item) => {
            item.key = item.id;
            item.value = item.id;
            item.text = item.nama;
            return item;
          });
          setListKabupaten(optionsKotaKabupaten);
        });
    };
    if (values.provinsi) {
      getKabupatenKota();
    }
  }, [values.provinsi]);


    return (
        <Select
        label="Kabupaten/kota"

            id="Kabupaten/kota"
            errorPrompt
            name="kabupaten"
            selectOnBlur={false}
            clearable
            placeholder="Pilih Kabupaten/Kota"
            options={listKabupaten}
          />
    )
}

export default ListKabupaten
