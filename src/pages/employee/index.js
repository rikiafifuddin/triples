// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/router'

// ** Demo Components Imports
import TableStickyHeaderEmployeeList from 'src/pages/employee/employeeList'
import { Button } from '@mui/material'

export async function getServerSideProps(ctx) {

  const postReq = await fetch(process.env.HOST_URL+'/api/employee/getAllEmployee');
  const ListEmployee = await postReq.json();

  return {
      props: {
          ListEmployee: ListEmployee.data
      }
  }
}

const MUITable = (props) => {
  const Router = useRouter()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>

        <Card>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <CardHeader title='List Pegawai' titleTypographyProps={{ variant: 'h6' }} />
            <Button onClick={() => Router.push('/employee/add')} startIcon={<AddCircleOutlineIcon />}>
              Tambah
            </Button>
          </Stack>


          <TableStickyHeaderEmployeeList
            ListEmployee ={props.ListEmployee}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
