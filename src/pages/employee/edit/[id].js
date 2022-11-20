// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsSeparator from 'src/pages/employee/edit/editEmployee'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

export async function getServerSideProps(ctx) {

  const { id } = ctx.query;
  const postReq = await fetch(process.env.HOST_URL+'/api/employee/detail/'+id);

  const detailEmployee = await postReq.json();

  return {
      props: {
        DetailEmployee: detailEmployee.data
      }
  }
}

const FormLayouts = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>

        <Grid item xs={12}>
          <FormLayoutsSeparator detailEmployee ={props.DetailEmployee} />
        </Grid>

      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
