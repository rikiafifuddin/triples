// ** React Imports
import * as React from 'react';
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import Router from 'next/router'
import cookies from 'next-cookies'
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

export async function getServerSideProps(ctx) {

  const allCookies = cookies(ctx)
  const status = allCookies.token !== undefined

  if (status) {
    return {
      redirect: {
        permanent: false,
        destination: `/`
      }
    }
  } else {
    return { props: {} }
  }
}

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const [fields, setFields] = useState({
    employeeID: '',
    password: ''
  })

  const [status, setStatus] = useState('normal')

  // ** Hook
  const theme = useTheme()

  function fieldHandler(e) {
    const name = e.target.getAttribute('name')

    setFields({
      ...fields,
      [name]: e.target.value
    })
  }

  async function loginHandler(e) {
    e.preventDefault()

    setStatus('loading')

    const loginReq = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })

    if (!loginReq.ok && loginReq.status === 401) {
      setOpen(true)
      setMessageSnack('Kode Pegawai atau Password salah')

      return setStatus('error')
    }

    const loginRes = await loginReq.json()
    setStatus('success')
    setMessageSnack('Login Berhasil')
    setOpen(true)

    Cookie.set('token', loginRes.token)
    Cookie.set('role', loginRes.roles)
    Cookie.set('name', loginRes.employeeIDs)

    loginRes.roles === 'user' ? Router.push('/') : Router.push('/employee')
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  const [messageSnack, setMessageSnack] = React.useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const LinkStyled = styled('a')(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }))

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://cdn.discordapp.com/attachments/509662159177908267/1015623642589167636/LOGO2.png" />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {/* {themeConfig.templateName} */}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography align='center' variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to Portal!
            </Typography>
            <Typography align='center' variant='body2'>
              Please sign-in to your account{' '}
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              onChange={fieldHandler.bind(this)}
              name='employeeID'
              autoFocus
              fullWidth
              id='employeeID'
              label='Kode Pegawai'
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                onChange={fieldHandler.bind(this)}
                name='password'
                label='Password'
                type='password'
                id='auth-login-password'
              />
            </FormControl>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7, marginTop: 7 }}
              onClick={loginHandler.bind(this)}
              disabled= {status === 'loading' ? true : false}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}></Divider>
          </form>
        </CardContent>
      </Card>

      <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {messageSnack}
        </Alert>
      </Snackbar>

      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
