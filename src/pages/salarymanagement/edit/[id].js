// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'
import * as dayjs from 'dayjs'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

export async function getServerSideProps(ctx) {

  const { id } = ctx.query;
  const postReq = await fetch(process.env.HOST_URL+'/api/salarymanagement/details/'+id);

  const detailSalary = await postReq.json();

  return {
      props: {
        DetailSalary: detailSalary.data
      }
  }
}

const FormLayoutsSeparator = (props) => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [date2, setDate2] = useState(null)
  const [status, setStatus] = useState("normal")
  const [requestStatus, setRequestStatus] = useState(null)
  const Router = useRouter()
  dayjs().format()

  const data = props.DetailSalary

  const [paramHeader, setParamHeader] = useState({
    employeeID: data?.employeeID,
    status: data?.status,
    insentif: data?.insentif,
    baseSalary: data?.baseSalary,
    OT: data?.OT,
    OTBKOorLP: data?.OTBKOorLP,
    LPBL: data?.LPBL,
    salaryDifferencePlus: data?.salaryDifferencePlus,
    OTLalu: data?.OTLalu,
    absensi: data?.absensi,
    salaryDifferenceMin: data?.salaryDifferenceMin,
    BPJSTK: data?.BPJSTK,
    BPJSKES: data?.BPJSKES,
    PPH21:data?.PPH21,
    other1: data?.other1,
    other2: data?.other2,
    other3: data?.other3,
    keteranganPotongan: data?.keteranganPotongan,
    salaryDate: data?.salaryDate
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  const [value, setValue] = useState(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  function fieldHandler(e) {
    const name = e.target.getAttribute('name')

    setParamHeader({
      ...paramHeader,
      [name]: e.target.value
    })
  }

  async function submitHandler(e) {
    e.preventDefault()

    setStatus('loading')

    const submitReq = await fetch('/api/salarymanagement/edit/'+data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paramHeader)
    })

    if(submitReq.status === 200) {
      console.log("success Edit Salary");
      setRequestStatus(true);
      Router.push('/salarymanagement');
    } else {
      console.log("failed Edit Salary");
      setRequestStatus(false);
    }

  }



  return (
    <Card>
      <CardHeader title='Edit Gaji Karyawan' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={submitHandler.bind(this)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
              disabled
              onChange={fieldHandler.bind(this)}
              name='employeeID'
              fullWidth label='No ID Karyawan' defaultValue={data?.employeeID} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='status'
              fullWidth label='Status' defaultValue={data?.status} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='insentif'
              fullWidth label='Insentif' defaultValue={data?.insentif} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='baseSalary'
              required fullWidth label='Gaji Pokok' defaultValue={data?.baseSalary} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='OT'
              fullWidth label='OT' defaultValue={data?.OT} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='OTBKOorLP'
              fullWidth label='OT BKO / LP' defaultValue={data?.OTBKOorLP} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='LPBL'
              fullWidth label='LP BL' defaultValue={data?.LPBL} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='salaryDifferencePlus'
              fullWidth label='Selisih Gaji +' defaultValue={data?.salaryDifferencePlus} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='OTLalu'
              fullWidth label='OT Lalu' defaultValue={data?.OTLalu} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='absensi'
              fullWidth label='Absensi' defaultValue={data?.absensi}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='salaryDifferenceMin'
              fullWidth label='Selisih Gaji -' defaultValue={data?.salaryDifferenceMin} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='BPJSTK'
              fullWidth label='BPJS Tenaga Kerja' defaultValue={data?.BPJSTK} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='BPJSKES'
              fullWidth label='BPJS Kesehatan' defaultValue={data?.BPJSKES} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='PPH21'
              fullWidth label='PPH21' defaultValue={data?.PPH21} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='other1'
              fullWidth label='Potongan Lain Lain 1' defaultValue={data?.other1} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='other2'
              fullWidth label='Potongan Lain Lain 2' defaultValue={data?.other2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='other3'
              fullWidth label='Potongan Lain Lain 3' defaultValue={data?.other3} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={fieldHandler.bind(this)}
                name='salaryDate'
                type='date'
                defaultValue={dayjs(data?.salaryDate).format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth label='Tanggal Gaji' />
            </Grid>
            <Grid item xs={12}>
              <TextField
              multiline
              rows={4}
              onChange={fieldHandler.bind(this)}
              name='keteranganPotongan'
              fullWidth label='Keterangan Potongan' defaultValue={data?.keteranganPotongan} />
            </Grid>


          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={()=> Router.push('/salarymanagement')}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
