// ** React Imports
import * as React from 'react';
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

const FormLayoutsSeparator = () => {
  // ** States
  const Router = useRouter()
  const [status, setStatus] = useState("normal")
  const [open, setOpen] = React.useState(false);
  const [messageSnack, setMessageSnack] = React.useState('');

  const [paramBody, setParamBody] = useState({
    fullName: '',
    email: '',
    identityID: '',
    employeeID: '',
    perusahaan: '',
    jobSkill: '',
    jobType: '',
    joinDate: null,
    placeofBirth: '',
    birthDate: null,
    gender: '',
    religion: '',
    phoneNumber: '',
    noRekening:'',
    education: '',
    motherName: '',
    streetAddress: '',
    kelurahanAddress: '',
    kecamatanAddress: '',
    kotaAddress: '',
    dInsurance: '',
    bpjsKesehatan: '',
    jkkother: '',
    noteinsurance: ''
  })

  function fieldHandler(e) {
    const name = e.target.getAttribute('name')

    setParamBody({
      ...paramBody,
      [name]: e.target.value
    })
  }

  async function submitHandler(e) {
    e.preventDefault()

    setStatus('loading')

    const submitReq = await fetch('/api/employee/addEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paramBody)
    })

    const res = await submitReq.json()
    if(submitReq.status === 200) {
      console.log("success add employee");
      setOpen(true)
      setStatus('success')
      setMessageSnack('Berhasil Menambah Pegawai')
      Router.push('/employee');
    } else {
      console.log("failed add employee");
      setOpen(true)
      setStatus('error')
      setMessageSnack(`Failed Add ${res.message}`)
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
    <Card>
      <CardHeader title='Tambah Pekerja' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={submitHandler.bind(this)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Karyawan Detail
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='fullName'
              fullWidth label='Nama Lengkap' placeholder='Abby Setyo Wiratama' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='email'
              fullWidth type='email' label='Email' placeholder='abbys@gmail.com' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='identityID'
              fullWidth label='Nomer KTP' placeholder='3524150659800001' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='employeeID'
              required fullWidth label='Nomor Pekerja' placeholder='2666378615' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='perusahaan'
              fullWidth label='Perusahaan' placeholder='Telkom' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='jobSkill'
              fullWidth label='Skill Pekerjaan' placeholder='General Manger' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='jobType'
              fullWidth label='Jenis Pekerjaan' placeholder='Common' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={fieldHandler.bind(this)}
                name='joinDate'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth label='Tanggal Masuk' placeholder='Common' />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Personal Info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='placeofBirth'
              fullWidth label='Tempat Lahir' placeholder='Jakarta' />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                onChange={fieldHandler.bind(this)}
                name='birthDate'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth label='Tanggal Lahir' placeholder='Common' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='gender'
              fullWidth label='Jenis Kelamin' placeholder='Perempuan' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='religion'
              fullWidth label='Agama' placeholder='Islam' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='phoneNumber'
              fullWidth label='Nomer HP' placeholder='+1-123-456-8790' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='noRekening'
              fullWidth label='Nomer Rekening' placeholder='1234568790' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='education'
              fullWidth label='Pendidikan' placeholder='SMP' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='motherName'
              fullWidth label='Nama Ibu' placeholder='SMP' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='streetAddress'
              fullWidth label='Alamat (KTP)' placeholder='Jl. Dalam Belakang' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='kelurahanAddress'
              fullWidth label='Kelurahan (KTP)' placeholder='Payaman' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='kecamatanAddress'
              fullWidth label='Kecamatan (KTP)' placeholder='Lamongan' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='kotaAddress'
              fullWidth label='Kota (KTP)' placeholder='Lamongan' />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. Asuransi
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='dInsurance'
              fullWidth label='D Asuransi' placeholder='072201740' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='bpjsKesehatan'
              fullWidth label='BPJS Kesehatan' placeholder='0000452600144' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='jkkother'
              fullWidth label='JKK JKM dll' placeholder='-' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={fieldHandler.bind(this)}
              name='noteinsurance'
              fullWidth label='Keterangan Asuransi' placeholder='PBI (APBN) / OK Edabu 05-07-2022' />
            </Grid>

          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button
            disabled= {status === 'loading' ? true : false}
            size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Tambah
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={()=> Router.push('/employee')}>
            Cancel
          </Button>
        </CardActions>
      </form>

      <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {messageSnack}
        </Alert>
      </Snackbar>

    </Card>
  )
}

export default FormLayoutsSeparator
