import './InvoicePDF.css';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import Cmyktop from '/src/assets/Cmyktop.png';
import Members from '/src/assets/members.png';
import MavtarLogoTop from '/src/assets/mavtarlogotop.png';
import Address from '/src/assets/Address.png';
import BTT from '/src/assets/BTt.png';
import QRCode from '/src/assets/QR_Code.png';

const InvoicePDF = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};

  const pdfRef = useRef(); 

 const downloadPdf = () =>{
    const input = pdfRef.current;
    html2canvas(input).then( (canvas)=>{
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p','mm','a4',true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth , pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 1;
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
      pdf.save('invoice.pdf')

    } )
 }

  return (
    <>
    <div style={{
      position: 'sticky', 
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      padding: '20px',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <button 
        onClick={downloadPdf}
        style={{
          backgroundColor: '#000080',
          color: 'white', 
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          ':hover': {
            backgroundColor: '#000066',
            transform: 'translateY(-2px)', 
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)'
          }
        }}
      >
        Download PDF
      </button>
    </div>
    
    <div className="pdf-container" ref={pdfRef}>
      <div className="pdf-content">
        <header className="pdf-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding: '30px' }}>
            {/* Logo on left side */}
            <div>
              <img src={Cmyktop} alt="Logo" style={{ width: '350px' }} />
            </div>

            {/* Members on right side */}
            <div className="members">
              <img src={Members} alt="Members" style={{ width: '350px' }} />
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img src={MavtarLogoTop} alt="Mavtar Printing Press Logo" style={{ width: '780px',marginTop: '5px' }} />
          </div>
        </header>
      </div>
      
      <div
        style={{
          borderBottom: '2px solid black',
          marginBottom: '15px'
        }}
      >
      </div>
        <div style={{ textAlign: 'center' }}>
          <img src={Address} alt="Address" style={{ width: '90%' }} />
        </div>
      <div
        style={{
          borderTop: '2px solid black',
          marginTop: '10px'
        }}
      >
      </div>

      <div style={{ display: 'flex', margin: '10px' }}>
        <div style={{ flex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ width: '80px', fontWeight: 'bold', fontSize: '19px'}}>M/s.</label>
            <span style={{ flex: 1, padding: '5px', fontWeight: 'bold', fontSize: '26px', textTransform: 'uppercase' }}>{formData.ms}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '80px', fontWeight: 'bold', fontSize: '19px' }}>Mobile No.</label>
            <span style={{ flex: 1, padding: '5px', fontWeight: 'bold', fontSize: '22px' }}>{formData.mobileNo}</span>
          </div>
        </div>

        <span style={{ width: '2px', background: 'black', margin: '0 20px'}}></span>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ width: '80px', fontWeight: 'bold',fontSize: '19px' }}>Bill No</label>
            <span style={{ flex: 1, padding: '5px',fontWeight: 'lighter', fontSize: '22px' }}>{formData.billNo}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '80px', fontWeight: 'bold',fontSize: '19px' }}>Date.</label>
            <span style={{ flex: 1, padding: '5px',fontWeight: 'bold', fontSize: '22px' }}>
              {formData.date ? format(new Date(formData.date), 'dd/MM/yyyy') : ''}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: '2px solid black',
          marginTop: '10px'
        }}
      >
      </div>

      <div style={{ width: '2px', background: 'black', margin: '0 20px' }}></div>

      <div className="invoice-items">
        <div style={{ 
          display: 'flex',
          backgroundColor: '#000080', 
          color: 'white',
          padding: '0.5px',
          marginTop: '1.2rem',
          fontWeight: 'bold', 
          fontSize: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ flex: '0.3', textAlign: 'center', padding: '8px', fontWeight: 'bold', fontSize:'4xl' }}>
            SL.
          </div>
          <div style={{ flex: '2', textAlign: 'center', padding: '8px', fontWeight: 'bolder', borderLeft: '3.5px solid white',fontSize:'4xl' }}>
            Item Description
          </div>
          <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', fontWeight: 'bold', borderLeft: '3.5px solid white' }}>
            Qty.
          </div>
          <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', fontWeight: 'bold', borderLeft: '3.5px solid white' }}>
            Price
          </div>
          <div style={{ flex: '0.8', textAlign: 'center', padding: '8px', fontWeight: 'bold', borderLeft: '3.5px solid white' }}>
            Amount
          </div>
        </div>

        {formData.items?.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex',
            position: 'relative'
          }}>
            <div style={{ flex: '0.3', textAlign: 'center', padding: '8px', fontWeight: 'normal', fontSize: '28px', fontFamily: 'Arial, sans-serif', position: 'relative', zIndex: 2 }}>
              {(item.description || item.qty || item.price || item.amount) ? index + 1 : ''}
            </div>
            <div style={{ flex: '2', padding: '8px', borderLeft: '3.5px solid #000080', fontWeight: 'normal' , fontSize: '28px' , textAlign: 'center', position: 'relative', zIndex: 2 }}>
              {item.description}
            </div>
            <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080',  fontWeight: 'normal' , fontSize: '28px', position: 'relative', zIndex: 2 }}>
              {item.qty}
            </div>
            <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal' , fontSize: '28px', position: 'relative', zIndex: 2 }}>
              {item.price}
            </div>
            <div style={{ flex: '0.8', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal' , fontSize: '28px', position: 'relative', zIndex: 2 }}>
              {item.amount}
            </div>
          </div>
        ))}

        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ display: 'flex'}}>
            <div style={{ flex: '0.3', textAlign: 'center', padding: '8px', fontWeight: 'normal', fontSize: '18px' }}></div>
            <div style={{ flex: '2', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '25px' }}>
              <br />
            </div>
            <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '18px' }}></div>
            <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '18px' }}></div>
            <div style={{ flex: '0.8', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '18px' }}></div>
          </div>
        ))}

        <div style={{ display: 'flex', borderBottom: '2px solid #000080'}}>
          <div style={{ flex: '0.3', textAlign: 'center', padding: '8px', fontWeight: 'normal', fontSize: '18px' }}></div>
          <div style={{ flex: '2', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '25px' }}>
            <br />
          </div>
          <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '18px' }}></div>
          <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '18px' }}></div>
          <div style={{ flex: '0.8', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontSize: '27px', fontWeight: 'bold' }}>TOTAL</div>
        </div>

        <div style={{ display: 'flex'}}>
          <div style={{ flex: '0.32', textAlign: 'center', padding: '8px', fontWeight: 'normal', fontSize: '18px' }}></div>
          <div style={{ flex: '2', padding: '8px', fontWeight: 'normal', fontSize: '25px' }}>
            <br />
          </div>
          <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '18px',borderBottom: '2px solid #000080' }}></div>
          <div style={{ flex: '0.5', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'normal', fontSize: '18px',borderBottom: '2px solid #000080' }}></div>
          <div style={{ flex: '0.8', textAlign: 'center', padding: '8px', borderLeft: '3px solid #000080', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Arial, sans-serif', borderBottom: '2px solid #000080' }}>
            {formData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0).toFixed(2)}/-


                  {/* {(() => {
              const subtotal = formData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
              const gst = subtotal * 0.18; // 18% GST
              const total = subtotal + gst;
              return `${subtotal.toFixed(2)} + ${gst.toFixed(2)} (GST) = ${total.toFixed(2)}/-`;
            })()} */}
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
        marginTop: 'auto'
      }}>
        <img 
          src={BTT}
          alt="BT Logo" 
          style={{
            height: '9.7rem',
            marginRight: '20px'
          }}
        />
        <img
          src={QRCode}
          alt="QR Code"
          style={{
            height: '9.5rem',
          }}
        />
      </div>

    </div>
    </>
  );
};

export default InvoicePDF;
