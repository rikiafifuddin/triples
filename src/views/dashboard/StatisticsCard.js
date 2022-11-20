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




const renderStats = (props) => {

  const baseSalaryData = Number(props?.baseSalary).toFixed(2);
  const baseSalary = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseSalaryData))}`;

  const baseInsentifData = Number(props?.insentif).toFixed(2);
  const baseInsentif = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseInsentifData))}`;

  const baseOTData = Number(props?.OT).toFixed(2);
  const baseOT = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseOTData))}`;

  const basesalaryDifferencePlusData = Number(props?.salaryDifferencePlus).toFixed(2);
  const basesalaryDifferencePlus = `Rp ${new Intl.NumberFormat('id-ID').format(Number(basesalaryDifferencePlusData))}`;

  const baseOTBKOorLPData = Number(props?.OTBKOorLP).toFixed(2);
  const baseOTBKOorLP = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseOTBKOorLPData))}`;

  const baseOTLaluData = Number(props?.OTLalu).toFixed(2);
  const baseOTLalu = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseOTLaluData))}`;

  const baseLPBLData = Number(props?.LPBL).toFixed(2);
  const baseLPBL = `Rp ${new Intl.NumberFormat('id-ID').format(Number(baseLPBLData))}`;




  const salesData = [
    {
      stats: baseSalary,
      title: 'Gaji Pokok',
      color: 'success',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseInsentif,
      title: 'Insenstif',
      color: 'success',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseOT,
      color: 'success',
      title: 'OverTime',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: basesalaryDifferencePlus,
      color: 'success',
      title: 'Selisih Gaji',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseOTBKOorLP,
      color: 'success',
      title: 'OT BKO / LP',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseOTLalu,
      color: 'success',
      title: 'OT Lalu',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: baseLPBL,
      color: 'success',
      title: 'LP BL',
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='subtitle2'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = (props) => {
  const data = props.data
  const salaryDataPlus = Number(data?.sumSalaryPlus).toFixed(2);
  const salaryFormatPlus = `Rp ${new Intl.NumberFormat('id-ID').format(Number(salaryDataPlus))}`;

  return (
    <Card>
      <CardHeader
        title='Detail Gaji'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total {salaryFormatPlus}
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

export default StatisticsCard
