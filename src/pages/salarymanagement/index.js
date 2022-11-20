// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { useRouter } from 'next/router'


// ** Demo Components Imports
import TableStickyHeader from 'src/pages/salarymanagement/salaryList'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export async function getServerSideProps(ctx) {

  const postReq = await fetch(process.env.HOST_URL+'/api/salarymanagement/getAllSalary');
  const ListSalary = await postReq.json();

  return {
      props: {
          ListSalary: ListSalary.data
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
          <CardHeader title='List Gaji Karyawan' titleTypographyProps={{ variant: 'h6' }} />
          <Button onClick={() => Router.push('salarymanagement/add/addSalary/')} startIcon={<AddCircleOutlineIcon />}>
              Tambah
            </Button>
        </Stack>
        <TableStickyHeader
            ListSalary ={props.ListSalary}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
