import React, {useState} from 'react'
import {Form} from 'semantic-ui-react'
function Upload(props) {
    const [fileName, setFileName] = useState("");

    const handleChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
          reader.onloadend = () => setFileName(file.name);
          reader.readAsDataURL(file);
          props.setFieldValue(props.field.name, file);
        }
      };

    return (
        <Form.Input 
    //    error={formik.errors.ijazah && formik.touched.ijazah && { content: formik.errors.ijazah, pointing: 'below' }}
       name={props.field.name}
       label={props.title}
       type="file"
      onChange={handleChange}
      />
    )
}

export default Upload
