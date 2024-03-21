import React from 'react';
import './PaginationComponent.css';
import { Pagination } from '@mui/material';

interface PaginationComponentProps {
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageCount: number;
}


const PaginationComponent = (props: PaginationComponentProps) => {
  return (
    <>
      <Pagination
        count={props.pageCount}
        onChange={(_, page) => props.onPageChange(page)}
        page={props.currentPage}
        showFirstButton
        showLastButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
        siblingCount={0}
        boundaryCount={2}
        color="primary"
      />
    </>
  );
};

export default PaginationComponent;
