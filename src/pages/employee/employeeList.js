// ** React Imports
import * as React from 'react';
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

const columns = [
  { id: 'fullName', label: 'Nama', minWidth: "20%" },
  { id: 'employeeID', label: 'Kode Pegawai', minWidth: "15%" },
  {id: 'jobSkill', label: 'Skill Pekerjaan', minWidth: "15%", align: 'right'},
  {id: 'jobType', label: 'Jenis Pekerjaa', minWidth: "15%", align: 'right'},
  {id: 'perusahaan', label: 'Perusahaan', minWidth: "25%", align: 'right'}
]


const TableStickyHeaderEmployeeList = (props) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [status, setStatus] = useState("normal")
  const [open, setOpen] = React.useState(false);
  const [messageSnack, setMessageSnack] = React.useState('');
  const Router = useRouter()

  const {
    ListEmployee
  } = props

  const data = ListEmployee || [] ;
  const rows = [];

  data.forEach(e => {
    rows.push({
      fullName: e.fullName,
      employeeID: e.employeeID,
      jobSkill: e.jobSkill,
      jobType: e.jobType,
      perusahaan: e.perusahaan
    })
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  async function deleteHandler(employeeID, e) {
    e.preventDefault();

    const ask = confirm(`Apakah data Pegawai ${employeeID} ?`);

    if(ask) {
      const deletePost = await fetch('/api/employee/delete/' + employeeID, {
          method: 'DELETE'
      });

      const res = await deletePost.json();
      if( deletePost.status === 200 ) {
        console.log("success delete employee");
        setStatus('success')
        setMessageSnack(`Berhasil Hapus Pegawai`)
        setOpen(true)
        Router.reload(window.location.pathname);
      } else {
        console.log("failed Delete employee");
        setMessageSnack(`Gagal Hapus Pegawai`)
        setStatus('error')
        setOpen(true)
      }
    }
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell key="action" align="center" sx={{ minWidth: "10%" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    )
                  })}

                  <TableCell align='center' key={row.employeeID}>
                    <IconButton
                      id="viewButton"
                      onClick={() => Router.push(`/employee/detail/${row.employeeID}`)}
                      title="Lihat Detail"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      id="editButton"
                      onClick={() => Router.push(`/employee/edit/${row.employeeID}`)}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      id="deleteButton"
                      onClick={deleteHandler.bind(this, row.employeeID)}
                      title="Delete"
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>

                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default TableStickyHeaderEmployeeList
