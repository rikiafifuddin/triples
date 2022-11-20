import db from '../../../../libs/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  //need add auth
  const {
    employeeID,
    status,
    insentif,
    baseSalary,
    OT,
    OTBKOorLP,
    LPBL,
    salaryDifferencePlus,
    OTLalu,
    absensi,
    salaryDifferenceMin,
    BPJSTK,
    BPJSKES,
    PPH21,
    other1,
    other2,
    other3,
    keteranganPotongan,
    salaryDate
  } = req.body;

  try{
    const addSalary = await db('salary').insert({
      employeeID,
      status,
      insentif,
      baseSalary,
      OT,
      OTBKOorLP,
      LPBL,
      salaryDifferencePlus,
      OTLalu,
      absensi,
      salaryDifferenceMin,
      BPJSTK,
      BPJSKES,
      PPH21,
      other1,
      other2,
      other3,
      keteranganPotongan,
      salaryDate
    });

    if (addSalary){
      const createData = await db('salary').where('id', addSalary).first();
      res.status(200);
      res.json({
        message: 'Add New Salary Successfully',
        data: createData
      })
    }

  } catch (err){
    console.log(err)
    res.status(500);
    res.json({
      message: 'Failed Add New Salary',
      data: {}
    })
  }

}
