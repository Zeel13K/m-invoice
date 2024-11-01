import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/Invoice/Form';
import InvoicePDF from './components/Invoice/InvoicePDF';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/invoice" element={<InvoicePDF />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;