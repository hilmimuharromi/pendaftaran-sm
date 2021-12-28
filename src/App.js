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
      <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', marginBottom: 20}}>
      <Button onClick={() => window.location.href='https://shohibulmuslimin.com'}>{'<'} Kembali Ke Home</Button>
      </div>
      <Card style={{width: '80vw', padding: 20}}>

      <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginBottom: 20}}>
      <Image src="https://shohibulmuslimin.com/wp-content/uploads/2019/11/logo-sm.png" />
      </div>
      <FormPendaftaran />
  </Card>

</Container>
</div>
</>
   );
}


export default App;
