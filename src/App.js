import {  Container, Image, Card, Button } from 'semantic-ui-react'
import FormPendaftaran from './components/formPendaftaran';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <div style={{minHeigth: '100vh', backgroundColor: 'EEF2FF', padding: '10vh'}}>
    <Container>
      <Button>{'<'} Kembali Ke Home</Button>   <h2>Form Pendaftaran Santri</h2>
      <Card style={{width: '80vw', padding: 20}}>

      <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
      <Image src="https://shohibulmuslimin.com/wp-content/uploads/2019/11/logo-sm.png" />
      </div>
      <FormPendaftaran />
  {/* <Tab menu={{ secondary: true, pointing: true }} panes={panes} /> */}
  </Card>

</Container>
</div>
</>
   );
}


export default App;
