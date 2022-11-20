// ** React Imports
import { useState } from 'react'
import * as dayjs from 'dayjs'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = (props) => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const data = props.detailEmployee
  dayjs().format()

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>


          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Nama Lengkap'  defaultValue={data?.fullName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Email' type='email' defaultValue={data?.email || '-'}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nomor KTP'
              defaultValue={data?.identityID }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='No ID Karyawan' defaultValue={data?.employeeID} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Perusahaan' defaultValue={data?.perusahaan} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Skill Pekerjaan' defaultValue={data?.jobSkill} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Jenis Pekerjaan' defaultValue={data?.jobType} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Tanggal Masuk'  defaultValue={dayjs(data?.joinDate).format('DD-MMM-YYYY')} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
