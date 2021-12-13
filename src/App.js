import { Tab, Container } from 'semantic-ui-react'
import FormPendaftaran from './components/formPendaftaran';
function App() {
  const panes = [
    {
      menuItem: 'Pendaftaran',
      render: () => <Tab.Pane attached={false}><FormPendaftaran /></Tab.Pane>,
    },
    {
      menuItem: 'Formulir',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
  ]
  return (
    <Container>
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
</Container>
   );
}

export default App;
