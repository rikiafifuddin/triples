// ** React Imports
import { useState } from 'react'
import * as dayjs from 'dayjs'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import { color } from '@mui/system'

const TabSecurity = (props) => {
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  dayjs().format();
  const data = props.detailEmployee;

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Tempat Lahir' defaultValue={data?.placeofBirth} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Tanggal Lahir' defaultValue={dayjs(data?.birthDate).format('DD-MMM-YYYY')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Jenis Kelamin' defaultValue={data?.gender}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Agama' defaultValue={data?.religion} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Nomor HP' defaultValue={data?.phoneNumber} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='No Rekening' defaultValue={data?.noRekening} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Pendidikan' defaultValue={data?.education} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Nama Ibu' defaultValue={data?.motherName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Alamat KTP' defaultValue={data?.streetAddress} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Kelurahan KTP' placeholder='Setia budi' defaultValue={data?.kelurahanAddress} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Kecamatan KTP' placeholder='Kuningan' defaultValue={data?.kecamatanAddress} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Kota KTP' placeholder='Jakarta Selatan' defaultValue={data?.kotaAddress} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabSecurity
