import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Snackbar } from '@mui/material'; 
import { Column } from 'ag-grid-community';

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('http://carrestapi.herokuapp.com/cars')
      .then((response) => response.json())
      .then((data) => {
        const carsData = data._embedded.cars; 
        setCars(carsData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const deleteCar = (params) => {
    const deleteUrl = params.data._links.car.href;
    console.log("Delete URL: " + deleteUrl);
  
    if (window.confirm('Are you sure you want to delete this car?')) {
      fetch(deleteUrl, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            setCars(prevCars => prevCars.filter(car => car._links.car.href !== deleteUrl));
            setOpen(true);
            setMsg('Car deleted successfully');
          } else {
            alert('Something went wrong in deletion: ' + response.status);
          }
        })
        .catch(err => console.error('Error:', err));
    }
  };
  


  const columnDefs = [
    { headerName: 'Brand', field: 'brand' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Color', field: 'color' },
    { headerName: 'Fuel', field: 'fuel' },
    { headerName: 'Year', field: 'year' },
    { headerName: 'Price', field: 'price' },
    {
      cellRenderer: params => (
        <Button size="small" color="error" onClick={() => deleteCar(params)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div className="centered-container"  >
      <div className="ag-theme-alpine" style={{  height: '700px', width: '1080px', margin: 'auto' }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          domLayout='autoHeight'
          pagination={true}
          paginationPageSize={11}
          rowSelection='single'
          style={{ width: '100%' }}
        />
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message={msg}
        />
      </div>
    </div>
  );
}

export default Carlist;
