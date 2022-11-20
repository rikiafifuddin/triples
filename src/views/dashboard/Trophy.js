// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack';
import * as dayjs from 'dayjs'
import { formatNumberToRupiah, formatHiddenAccountNumber } from '../../../helper/transform';

dayjs().format()

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = (props) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  const data = props.data
  const formatDate = dayjs(data?.salaryDate).format('MMM-YYYY')

  const generateInvoice = (props, e) => {
    e.preventDefault();
    const paramData = props.data
    const formatDatesalary = dayjs(paramData?.salaryDate).format('MMM-YYYY')

    // send a post request with the name to our API endpoint
    const fetchData = async () => {
      const dataPDF = await fetch('/api/generate-invoice', {
        method: 'POST',
        body: JSON.stringify({
          id: paramData?.id,
          employeeID: paramData?.employeeID,
          status: paramData?.status,
          insentif: formatNumberToRupiah(paramData?.insentif),
          baseSalary: formatNumberToRupiah(paramData?.baseSalary),
          OT: formatNumberToRupiah(paramData?.OT),
          OTBKOorLP: formatNumberToRupiah(paramData?.OTBKOorLP),
          LPBL: formatNumberToRupiah(paramData?.LPBL),
          salaryDifferencePlus: formatNumberToRupiah(paramData?.salaryDifferencePlus),
          OTLalu: formatNumberToRupiah(paramData?.OTLalu),
          absensi: formatNumberToRupiah(paramData?.absensi),
          salaryDifferenceMin: formatNumberToRupiah(paramData?.salaryDifferenceMin),
          BPJSTK: formatNumberToRupiah(paramData?.BPJSTK),
          BPJSKES: formatNumberToRupiah(paramData?.BPJSKES),
          PPH21: formatNumberToRupiah(paramData?.PPH21),
          other1: formatNumberToRupiah(paramData?.other1),
          other2: formatNumberToRupiah(paramData?.other2),
          other3: formatNumberToRupiah(paramData?.other3),
          keteranganPotongan: paramData?.keteranganPotongan,
          salaryDate: formatDatesalary,
          fullName: paramData?.fullName,
          sumSalaryPlus: formatNumberToRupiah(paramData?.sumSalaryPlus),
          sumSalaryMin: formatNumberToRupiah(paramData?.sumSalaryMin),
          sumSalary: formatNumberToRupiah(paramData?.sumSalary),
          perusahaan: paramData?.perusahaan,
          jobSkill: paramData?.jobSkill,
          bpjsKesehatan: paramData?.bpjsKesehatan,
          bpjsTK: paramData?.bpjsTK,
          noRekening: formatHiddenAccountNumber(paramData?.noRekening)
        }),
      });

      // convert the response into an array Buffer
      return dataPDF.arrayBuffer();
    };

    // convert the buffer into an object URL
    const saveAsPDF = async () => {
      const buffer = await fetchData();
      const blob = new Blob([buffer]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Slip Gaji ${data?.fullName + " " +formatDate}.pdf`;
      link.click();
    };

    saveAsPDF();
  };

  const salaryData = Number(data?.sumSalary).toFixed(2);
  const salaryFormat = `Rp ${new Intl.NumberFormat('id-ID').format(Number(salaryData))}`;
  const monthValue = new Date().getMonth();
  const dateNow = dayjs().month(monthValue-1).format('MMMM-YYYY')

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>{data?.fullName}</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Total gaji Bulan {dateNow}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {salaryFormat}
        </Typography>
        <Stack spacing={2} direction="row">
          <Button
            disabled = {data ? false : true}
            onClick={generateInvoice.bind(this, props)} size='small' variant='contained'>
            Download
          </Button>
        </Stack>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
