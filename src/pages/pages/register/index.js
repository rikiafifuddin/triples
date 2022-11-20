// ** React Imports
import * as React from 'react';
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import Router from 'next/router'
import cookies from 'next-cookies'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// export async function getServerSideProps(ctx) {
//   const allCookies = cookies(ctx)
//   const status = allCookies.token !== undefined

//   if (!status) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/pages/login`
//       }
//     }
//   } else {
//     return { props: {} }
//   }
// }

const RegisterPage = () => {
  // ** States
  const [fields, setFields] = useState({
    employeeID: '',
    password: ''
  })

  const [status, setStatus] = useState('')
  const [messageSnack, setMessageSnack] = React.useState('');
  const [open, setOpen] = React.useState(false);

  // ** Hook
  const theme = useTheme()
  async function registerHandler(e) {
    e.preventDefault()
    setStatus('loading')

    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!registerReq.ok && registerReq.status === 401 || registerReq.status === 405) {
      setStatus('error')
      setMessageSnack('Username / Kode Pegawai Sudah terdaftar')

      return setOpen(true)
    }

    const registerRes = await registerReq.json()

    if (registerRes) {
      setStatus('success')
      setMessageSnack('Registrasi User Berhasil')
      setOpen(true)
      Router.reload(window.location.pathname);
    }
  }

  function fieldHandler(e) {

    const name = e.target.getAttribute('name')
    setFields({
      ...fields,
      [name]: e.target.value
    })
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
              Register New Account
            </Typography>
            <Typography align='center' variant='body2'>
              Make your app management easy and fun!
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              onChange={fieldHandler.bind(this)}
              fullWidth
              name='employeeID'
              label='Kode Pegawai'
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                name='password'
                label='Password'
                type='password'
                id='auth-register-password'
                onChange={fieldHandler.bind(this)}
              />
            </FormControl>

            <Button
              onClick={registerHandler.bind(this)}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginTop: 7, marginBottom: 7 }}
              disabled = {status === 'loading' ? true : false}
            >
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
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
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
