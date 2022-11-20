// ** React Imports
import { useState } from 'react'
import * as dayjs from 'dayjs'
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

const columns = [
  { id: 'fullName', label: 'Nama', minWidth: "25%" },
  { id: 'employeeID', label: 'Kode Pegawai', minWidth: "15%" },
  {id: 'perusahaan', label: 'Perusahaan', minWidth: "15%", align: 'center'},
  {id: 'salaryDate', label: 'Tanggal Gaji', minWidth: "15%", align: 'center'},
  {id: 'sumSalary', label: 'Total Gaji', minWidth: "20%", align: 'left'}
]


const TableStickyHeader = (props) => {
  // ** States
  dayjs().format()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const Router = useRouter()

  const {
    ListSalary
  } = props

  const data = ListSalary || [] ;
  const rows = [];

  data.forEach(e => {
    const dateFormat = dayjs(e.salaryDate).format('DD-MMM-YYYY')
    const salaryData = Number(e.sumSalary).toFixed(2);
    const salaryFormat = `Rp ${new Intl.NumberFormat('id-ID').format(Number(salaryData))}`;

    rows.push({
      id: e.id,
      fullName: e.fullName,
      employeeID: e.employeeID,
      perusahaan: e.perusahaan,
      salaryDate: dateFormat,
      sumSalary: salaryFormat
    })
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  async function deleteHandler(id, e) {
    e.preventDefault();

    const ask = confirm('Apakah data ini akan dihapus?');

    if(ask) {
      const deletePost = await fetch('/api/salarymanagement/delete/' + id, {
          method: 'DELETE'
      });

      const res = await deletePost.json();

      if( res ) {
        Router.reload(window.location.pathname);
      }
    }
  }

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
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}

                 <TableCell align='center' key={row.id}>
                    <IconButton
                      id="editButton"
                      onClick={() => Router.push(`/salarymanagement/edit/${row.id}`)}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      id="deleteButton"
                      onClick={deleteHandler.bind(this, row.id)}
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
    </Paper>
  )
}

export default TableStickyHeader
