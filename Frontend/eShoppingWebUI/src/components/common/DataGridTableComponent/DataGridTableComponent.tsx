import React from 'react';
import './DataGridTableComponent.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface DataGridTableComponentProps {
  columns: GridColDef[],
  rows: any[]
}


const DataGridTableComponent = (props: DataGridTableComponentProps) => {
  return (
    <div style={{width:"100%"}}>
     <div style={{width:"100%" , height:350}}>
     <DataGrid
        style={{ border: 'none', borderColor: 'transparent',maxWidth: '100%'}}
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
     </div>
    </div>
  );
};

export default DataGridTableComponent;
