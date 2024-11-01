import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css'; 
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ms: '',
    mobileNo: '',
    billNo: '',
    date: new Date(),
    items: [{ description: '', qty: '', price: '', amount: '' }]
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('invoiceFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Ensure items array exists and has valid structure
        if (!parsedData.items || !Array.isArray(parsedData.items)) {
          parsedData.items = [{ description: '', qty: '', price: '', amount: '' }];
        }
        // Convert date string back to Date object
        parsedData.date = parsedData.date ? new Date(parsedData.date) : new Date();
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        // Reset to default state if parsing fails
        setFormData({
          ms: '',
          mobileNo: '',
          billNo: '',
          date: new Date(),
          items: [{ description: '', qty: '', price: '', amount: '' }]
        });
      }
    }
  }, []);

  // Save to localStorage whenever form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('invoiceFormData', JSON.stringify(newFormData));
  };

  // Handle date change separately
  const handleDateChange = (date) => {
    const newFormData = { ...formData, date };
    setFormData(newFormData);
    localStorage.setItem('invoiceFormData', JSON.stringify(newFormData));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Auto-calculate amount if both qty and price are present
    if (field === 'qty' || field === 'price') {
      const qty = field === 'qty' ? value : newItems[index].qty;
      const price = field === 'price' ? value : newItems[index].price;
      if (qty && price) {
        newItems[index].amount = (parseFloat(qty) * parseFloat(price)).toString();
      }
    }

    const newFormData = { ...formData, items: newItems };
    setFormData(newFormData);
    localStorage.setItem('invoiceFormData', JSON.stringify(newFormData));
  };

  const addNewItem = () => {
    const newItems = [...formData.items, {
      sl: (formData.items.length + 1).toString(),
      description: '',
      qty: '',
      price: '',
      amount: ''
    }];
    const newFormData = { ...formData, items: newItems };
    setFormData(newFormData);
    localStorage.setItem('invoiceFormData', JSON.stringify(newFormData));
  };

  const clearItem = (index) => {
    // Only allow deletion if there's more than one item
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      const newFormData = { ...formData, items: newItems };
      setFormData(newFormData);
      localStorage.setItem('invoiceFormData', JSON.stringify(newFormData));
    } else {
      // If it's the last item, just clear its values
      const newItems = [{
        description: '',
        qty: '',
        price: '',
        amount: ''
      }];
      const newFormData = { ...formData, items: newItems };
      setFormData(newFormData);
      localStorage.setItem('invoiceFormData', JSON.stringify(newFormData));
    }
  };

  // Modified handleSubmit to ensure data is stored before navigation
  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the final form data in localStorage
    localStorage.setItem('invoiceFormData', JSON.stringify(formData));
    // Navigate to invoice page with data
    navigate('/invoice', { state: { formData } });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="form-group">
            <label>M/S:</label>
            <input
              type="text"
              name="ms"
              value={formData.ms}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter company name"
            />
          </div>

          <div className="form-group">
            <label>Mobile No:</label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter mobile number"
            />
          </div>

          <div className="form-group">
            <label>Bill No:</label>
            <input
              type="text"
              name="billNo"
              value={formData.billNo}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter bill number"
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        <div className="items-section">
          <h3 className="items-header">Invoice Items</h3>
          <div className="items-table">
            <div className="items-table-header">
              <div className="table-header-cell description" style={{fontSize: '1.2rem'}}>Description</div>
              <div className="table-header-cell" style={{fontSize: '1.2rem'}}>Quantity</div>
              <div className="table-header-cell" style={{fontSize: '1.2rem'}}>Price</div>
              <div className="table-header-cell" style={{fontSize: '1.2rem'}}>Amount</div>
              <div className="table-header-cell actions" style={{fontSize: '1.2rem'}}>Actions</div>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={index} className="items-table-row">
                <div className="table-cell description">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="form-control"
                    placeholder="Enter item description"
                  />
                </div>

                <div className="table-cell">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                    className="form-control"
                    placeholder="0"
                  />
                </div>

                <div className="table-cell">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    className="form-control"
                    placeholder="0.00"
                  />
                </div>

                <div className="table-cell">
                  <input
                    type="text"
                    value={item.amount}
                    disabled
                    className="form-control amount-field"
                    placeholder="0.00"
                  />
                </div>

                <div className="table-cell actions">
                  <button
                    type="button"
                    onClick={() => clearItem(index)}
                    className="clear-btn"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={addNewItem} className="add-item-btn">
              <i className="fas fa-plus"></i> Add New Item
            </button>
            <button type="button" onClick={() => {
              setFormData({
                ms: '',
                mobileNo: '',
                billNo: '', 
                date: new Date(),
                items: [{ description: '', qty: '', price: '', amount: '' }]
              });
              localStorage.removeItem('invoiceFormData');
            }} className="add-item-btn">
              <i className="fas fa-trash"></i> Clear All
            </button>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-btn">
            Generate Invoice
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;