import React, { useState} from 'react'
import { GoogleSpreadsheet } from "google-spreadsheet";



export default function TesSheet() {
    const [listData, setListData] = useState({})
    
// Config variables
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
// const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMXsxsImYajoFm\n3mNkhuSzWk/OnhFLEE+vLWBP88a9/IRDZCYcANh2DLMyhNyxWarKmmncHn6BhmVP\nnZETbS2Wby6KI8R81BoS+EeIHNRz+vE2MOFMWhWT9j99Mdj6KjEM+BjrvLJSx6aJ\ncDOiHyDXyLVB9mj0ndsdOvk6MewypB28xHWBvxyzAzQAGAWc3duwExO1zLvRjAul\nD7VIm6WT/TPCZwF5GApoyHvXpUV1OgnuJUO+hCri5qmCxBHIr40OK3+UJyAm1v3T\ndpV9NJUIDrjFFQDX6EZ0KPrRQy4g4VyjXmPJvKTUhHja/42+IgsnmyZHDpzNzFed\nOlaPCcUPAgMBAAECggEATAZh3kIHoI5tldJZwA4sKooIkTCc90MImX50SxnAz3EN\n1LH/OUCZRYTg7oSdQn48OiUqBx/y6IUR0AWp78OYB1OxyOKYV+VhE7h3h6tN3x01\nOPcDAK+sQkADCzQNZrZmS9BJGPy3i3LIwWzTUFZrFcqMnw6mqYTFe4CyMNNcbdOT\nZPrnrXqMqiu8sHYvrAYGSWe6+bjh8yXGbPCKMODetqCqRXw2Bn7aBJkwfsvq0egH\nYpS/N1phaBxeImC37aTKtfIrptXEJbt+NfWDKWO8hKGClC9ucTPM0H5G4bvuLo3G\nb9ksdZMqr9Uuogu29cIarl7k0ltLwB9WA+PAahEk6QKBgQD7trya6KbZFWdFaL4h\nk0lluhiEQnRarvajDctqnc0vtqHoxjdp30wRcVUZkNCjBMsA0Ve1bQRaE8RzslZK\nckFTUjVkzstTYSdoe+3zH9E9F99tBwqjigbozEI1p/vhc5RvnOZ3YDdKWZZrpkt8\nXhzSTRNK/HvlUq1l/kwu9spXVwKBgQDP2a7y3b7YM9OruJz4/T1YJnsgQouJY5B7\npbNCyugAkUU2DkdW2LO59/fj6uSu+pIwSghzaNH1lnAYlUZsonlKGinoi9+wHFtH\nmd58cARp3+tClsimdJad8V+Ux40ZGnHHJfFi4Kzpa4LXLtnT+8PXMAVPkT234X2V\no2KPuIgFCQKBgH+iHipyU7/5kV7piJcfxvTVEv9lbvhYhWkSYpXSJCvQcHLGp2yA\ntGKX0+3dt10h3gmxHMc62x0Nrux3fjfLjYJBSh+ul/zUY5YgWPyRophW1YzEKEna\ngDxk7iGk5xxfbeHWbioT2JVTrekx7k7GrdiZCnJYaj5S2OfBtUGPE/SLAoGBAI3Y\nW/lodRZtABZfzdhqUlP3Ju3UHA/tv6tyYIzDlmLUwOvsAKl3B+hxHl4PbnMvk1ab\nH3tLXIYCXYuZS89VbfqxMkp+MnCoWW7axigb9hce9hmid1qJlERDdlw9dsBb+KvU\n7A/zjm1ZrpgVZBiz52nSXr13PCxiGWdmchvs7f6pAoGAYa+Gpda1HoPLQLrX/HaV\nOWYsVpYWNVaWtt8eoQ3aMPJgIEf1Kla+ywoxzqa2q30o0PRCYm4ZXgHbHV28qO90\nPRFqTC2Sgtlt/Uu2LWO5/4JELrGA/GuA5UAbF4ABRRhOysiR6rNLHBLIsscmScsH\nVFw94dRyz05ucT/ap1jGKfM=\n-----END PRIVATE KEY-----\n";

// process.env.REACT_APP_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n')
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
// const appendSpreadsheet = async (row) => {
//   try {
//     await doc.useServiceAccountAuth({
//       client_email: CLIENT_EMAIL,
//       private_key: PRIVATE_KEY,
//     });
//     // loads document properties and worksheets
//     await doc.loadInfo();
//     const sheet = doc.sheetsById[SHEET_ID];
//     const rows = await sheet.getRows()
//     setListData(rows)
//     const result = await sheet.addRow(row);
//     console.log('result==>', rows)
//   } catch (e) {
//     console.error('Error   ===>: ', e);
//   }
// };

const getData = async () => {
    await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      await doc.loadInfo();
      const sheet = doc.sheetsById[SHEET_ID];
      const rows = await sheet.getRows()
      const result = []
      rows.map((item) => {
          result.push({
              name: item._rawData[0],
              wali: item._rawData[1]
          })
      })
      console.log('rows', rows[0])
      console.log('result', result)
      setListData(result)


}

    return (
        <div>
            tes{JSON.stringify(listData)}
            <button onClick={() =>
getData()
             }>Tambah Data</button>
            
        </div>
    )
}

