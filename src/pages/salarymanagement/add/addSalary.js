// ** React Imports
import { forwardRef, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

const FormLayoutsSeparator = () => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [date2, setDate2] = useState(null)
  const [status, setStatus] = useState("normal")
  const [requestStatus, setRequestStatus] = useState(null)
  const Router = useRouter()

  // const [values, setValues] = useState({
  //   password: '',
  //   password2: '',
  //   showPassword: false,
  //   showPassword2: false
  // })

  const [paramHeader, setParamHeader] = useState({
    employeeID: '',
    status: '',
    insentif: 0,
    baseSalary: 0,
    OT: 0,
    OTBKOorLP: 0,
    LPBL: 0,
    salaryDifferencePlus: 0,
    OTLalu: 0,
    absensi: 0,
    salaryDifferenceMin: 0,
    BPJSTK: 0,
    BPJSKES: 0,
    PPH21:0,
    other1: 0,
    other2: 0,
    other3: 0,
    keteranganPotongan: '',
    salaryDate: ''
  })

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

    const submitReq = await fetch('/api/salarymanagement/addsalary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paramHeader)
    })

    if(submitReq.status === 200) {
      console.log("success add salary");
      setStatus('success')
      setRequestStatus(true);
      Router.push('/salarymanagement');
    } else {
      console.log("failed add salary");
      setStatus('failed')
      setRequestStatus(false);
    }

  }



  return (
    <Card>
      <CardHeader title='Tambah Gaji Karyawan' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={submitHandler.bind(this)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
              required
              onChange={fieldHandler.bind(this)}
              name='employeeID'
              fullWidth label='No ID Karyawan' placeholder='2233311112' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='status'
              fullWidth label='Status' placeholder='Administrasi' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='insentif'
              fullWidth label='insentif' placeholder='100.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='baseSalary'
              required fullWidth label='Gaji Pokok' placeholder='5.000.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='OT'
              fullWidth label='OT' placeholder='350.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='OTBKOorLP'
              fullWidth label='OT BKO / LP' placeholder='10.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='LPBL'
              fullWidth label='LP BL' placeholder='20.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='salaryDifferencePlus'
              fullWidth label='Selisih Gaji +' placeholder='200.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='OTLalu'
              fullWidth label='OT Lalu' placeholder='10.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='absensi'
              fullWidth label='Absensi' placeholder='10.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='salaryDifferenceMin'
              fullWidth label='Selisih Gaji -' placeholder='10.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='BPJSTK'
              fullWidth label='BPJS Tenaga Kerja' placeholder='20.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='BPJSKES'
              fullWidth label='BPJS Kesehatan' placeholder='10.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='PPH21'
              fullWidth label='PPH21' placeholder='20.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='other1'
              fullWidth label='Potongan Lain Lain 1' placeholder='20.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='other2'
              fullWidth label='Potongan Lain Lain 2' placeholder='34.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='other3'
              fullWidth label='Potongan Lain Lain 3' placeholder='34.000' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={fieldHandler.bind(this)}
                name='salaryDate'
                type='date'
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth label='Tanggal Gaji' placeholder='Common' />
            </Grid>
            <Grid item xs={12}>
              <TextField
              multiline
              rows={4}
              onChange={fieldHandler.bind(this)}
              name='keteranganPotongan'
              fullWidth label='Keterangan Potongan' placeholder='Potongan 1 Baju Kerja' />
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
