import * as dayjs from 'dayjs'
import React, { useEffect, useState } from "react";

// ** MUI Imports
import Grid from '@mui/material/Grid'
import cookies from 'next-cookies'
import jwt from 'jsonwebtoken'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles'
import { formatNumberToRupiah, formatHiddenAccountNumber } from '../../helper/transform';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import StatisticsCardPotongan from 'src/views/dashboard/StatisticsCardPotongan'

dayjs().format()

const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

export async function getServerSideProps(ctx) {

  const allCookies = cookies(ctx)
  const status = allCookies.token !== undefined

  if (!status) {
    return {
      redirect: {
        permanent: false,
        destination: `/pages/login`
      }
    }
  } else {
    const token = allCookies.token
    let datacookies
    let dataUser

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) return {};
      datacookies = decoded
    });

    dataUser = datacookies

    const postReq = await fetch(process.env.HOST_URL+'/api/salarymanagement/detail/'+ datacookies?.employeeID ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({month : new Date().getMonth()})
    });
    const detailEmployeeSalary = await postReq.json();

    return {
      props:{
        datacookies: detailEmployeeSalary.data,
        dataUser
      }
    }

  }
}

const Dashboard = (props) => {
  const [datas, setDatas] = React.useState(props)
  const [filter, setFilter] = React.useState()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/salarymanagement/detail/'+ datas.dataUser.employeeID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({month : filter})
      });

      const res = await data.json();
      setDatas({
        ...datas,
        ['datacookies']: res.data
      }
      );
    }

    fetchData()
    .catch(console.error);;

  }, [filter]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Trophy
            data={datas?.datacookies}
            filter = {setFilter}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatisticsCard
            data={datas?.datacookies}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatisticsCardPotongan
            data={datas?.datacookies}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

const Trophy = (props) => {
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  const data = props.data
  console.log("data333333", data)
  const formatDate = dayjs(data?.salaryDate).format('MMM-YYYY')

  const generateInvoice = (props, e) => {
    e.preventDefault();
    const paramData = props.data
    const formatDatesalary = dayjs(paramData?.salaryDate).format('MMM-YYYY')

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
          noRekening: paramData?.noRekening ? formatHiddenAccountNumber(paramData?.noRekening) : paramData?.noRekening
        }),
      });

      return dataPDF.arrayBuffer();
    };

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

  const salaryData = Number(data?.sumSalary).toFixed(2)
  const salaryFormat = `Rp ${new Intl.NumberFormat('id-ID').format(Number(salaryData))}`
  const monthValue = new Date().getMonth();
  const [month, setMonth] = React.useState(monthValue)
  const dateNow = dayjs().month(month-1).format('MMMM-YYYY')
  const [monthName, setMonthName] = React.useState(dateNow)

  async function handleChange (event) {
    console.log("month", event.target.value )
    setMonth(event.target.value)
    setMonthName(dayjs().month(event.target.value-1).format('MMMM-YYYY'))
    props.filter(event.target.value)
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>{data?.fullName}</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Total gaji Bulan {monthName}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {salaryFormat}
        </Typography>
        <Stack spacing={2} direction="row">
          <Button
            disabled = {data.sumSalary ? false : true}
            onClick={generateInvoice.bind(this, props)} size='small' variant='contained'>
            Download
          </Button>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Bulan</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={month}
              label="Month"
              onChange={handleChange}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Dashboard
