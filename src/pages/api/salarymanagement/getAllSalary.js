import db from '../../../../libs/db'

export default async function handler(req, res) {
  if(req.method !== 'GET') return res.status(405).end();

  //need add auth

  try {
    const allSalary = await db('salary')
      .join('employee', 'salary.employeeID', 'employee.employeeID')
      .select('employee.fullName',
        'employee.perusahaan',
        'salary.id',
        'salary.employeeID',
        'salary.insentif',
        'salary.baseSalary',
        'salary.OT',
        'salary.OTBKOorLP',
        'salary.LPBL',
        'salary.salaryDifferencePlus',
        'salary.OTLalu',
        'salary.absensi',
        'salary.salaryDifferenceMin',
        'salary.BPJSTK',
        'salary.BPJSKES',
        'salary.PPH21',
        'salary.other1',
        'salary.other2',
        'salary.other3',
        'salary.keteranganPotongan',
        'salary.salaryDate'
        )


    const calculateData = []

    allSalary.forEach(e => {
      let sumSalaryPlus = 0;
      let sumSalaryMin = 0;
      let sumSalary = 0;

      sumSalaryPlus = e.insentif + e.baseSalary + e.OT + e.OTBKOorLP + e.LPBL + e.salaryDifferencePlus + e.OTLalu ;
      sumSalaryMin = e.absensi + e.salaryDifferenceMin + e.BPJSTK + e.BPJSKES + e.PPH21 + e.other1 + e.other2 + e.other3;
      sumSalary = sumSalaryPlus - sumSalaryMin

      calculateData.push({
        id: e.id,
        fullName: e.fullName,
        employeeID: e.employeeID,
        perusahaan: e.perusahaan,
        salaryDate: e.salaryDate,
        sumSalary
      })
    });

    res.status(200);
    res.json({
      message: 'Success get All Salary',
      data: calculateData
    })

  } catch (err) {
    console.log(err)

    res.status(500);
    res.json({
      message: 'Failed get All Salary',
      data: {}
    })

  }
}
