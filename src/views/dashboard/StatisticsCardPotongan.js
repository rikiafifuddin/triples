// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// const salesData = [
//   {
//     stats: '245k',
//     title: 'Absensi',
//     color: 'primary',
//     icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '12.5k',
//     title: 'Selisih Gaji',
//     color: 'success',
//     icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '1.54k',
//     color: 'warning',
//     title: 'BPJSTK',
//     icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '$88k',
//     color: 'info',
//     title: 'BPJS KES',
//     icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '$88k',
//     color: 'info',
//     title: '',
//     icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '$88k',
//     color: 'info',
//     title: '',
//     icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '$88k',
//     color: 'info',
//     title: '',
//     icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '$88k',
//     color: 'info',
//     title: 'Potongan 3',
//     icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//   },

// ]

const renderStats = (props) => {

  const baseabsensiData = Number(props?.absensi).toFixed(2);
  const baseabsensi = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseabsensiData))}`;

  const basesalaryDifferenceMinData = Number(props?.salaryDifferenceMin).toFixed(2);
  const basesalaryDifferenceMin = `Rp ${new Intl.NumberFormat('id-ID').format(Number(basesalaryDifferenceMinData))}`;

  const baseBPJSTKData = Number(props?.BPJSTK).toFixed(2);
  const baseBPJSTK = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseBPJSTKData))}`;

  const baseBPJSKESData = Number(props?.BPJSKES).toFixed(2);
  const baseBPJSKES = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseBPJSKESData))}`;

  const basePPH21Data = Number(props?.PPH21).toFixed(2);
  const basePPH21 = `Rp ${new Intl.NumberFormat('id-ID').format(Number(basePPH21Data))}`;

  const baseother1Data = Number(props?.other1).toFixed(2);
  const baseother1 = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseother1Data))}`;

  const baseother2Data = Number(props?.other2).toFixed(2);
  const baseother2 = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseother2Data))}`;

  const baseother3Data = Number(props?.other3).toFixed(2);
  const baseother3 = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseother3Data))}`;

  const salesData = [
    {
      stats: baseabsensi,
      title: 'Absensi',
      color: 'error',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: basesalaryDifferenceMin,
      title: 'Selisih Gaji',
      color: 'error',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseBPJSTK,
      color: 'error',
      title: 'BPJS TK',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseBPJSKES,
      color: 'error',
      title: 'BPJS KES',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: basePPH21,
      color: 'error',
      title: 'PPH21',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseother1,
      color: 'error',
      title: 'Potongan 1',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseother2,
      color: 'error',
      title: 'Potongan 2',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseother3,
      color: 'error',
      title: 'Potongan 3',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
  ]

  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', padding: "4px" }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='subtitle2'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCardPotongan = (props) => {
  const data = props.data;
  const salaryDataMin = Number(data?.sumSalaryMin).toFixed(2);
  const salaryFormatMin = `Rp ${new Intl.NumberFormat('id-ID').format(Number(salaryDataMin))}`;

  return (
    <Card>
      <CardHeader
        title='Potongan Gaji'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total {salaryFormatMin}
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(data)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCardPotongan
