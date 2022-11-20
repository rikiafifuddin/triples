// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = (props) => {
  // ** State
  const [date, setDate] = useState(null)

  const data = props.detailEmployee;

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='D Asuransi' defaultValue={data?.dInsurance} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='BPJS Kesehatan'
              defaultValue={data?.bpjsKesehatan}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='JKK JKM Dll' defaultValue={data?.jkkother} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Keterangan Asuransi' defaultValue={data?.noteinsurance} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
