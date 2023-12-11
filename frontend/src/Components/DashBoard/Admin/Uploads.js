
import React from "react";
import './adstyle.css'
import uploads from "./Uploads";
import '../styledashb.css'
import AdminNavbar from "./AdminNavbar";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { useState } from 'react';
        
        
const Admindash = () => {
    const [products, setProducts] = useState([]);
    const columns = [
        {field: 'UploadDate', header: 'Upload Date'},
        {field: 'UploadType', header: 'Upload Type'},
        {field: 'County', header: 'County'},
        {field: 'File', header: 'Quantity'},
        {field: 'RecordCount', header: 'Record Count'},
        {field: 'View', header: 'View'}
    ];
    return (
        <>
<div className="dashboard-container">
<AdminNavbar/>
<div className="main-content">
 <div className="top-content">
    <h2>New Uploads</h2>
    <div className="card flex justify-content-center">
            <Button label="New Upload" > <i style={{marginLeft:'5px'}} className="pi pi-plus"></i>
        </Button>
        </div>
 </div>

 <div className="bottom-content">
 <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
</div>
 </div>
</div>
</div>  
</>
    )
}
export default Admindash;


