import db from '../../../../../libs/db';
import * as dayjs from 'dayjs'

export default async function handler(req, res) {
    dayjs().format()
    if(req.method !== 'PUT') return res.status(405).end();

    const { id } = req.query;

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

    const formatSalaryDate = dayjs(salaryDate).format('YYYY-MM-DD')

    try{
      const editSalary = await db('salary')
        .where({ id })
        .update({
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
          salaryDate: formatSalaryDate
        });

      if(editSalary) {
        const detailSalary = await db('salary').where({ id }).first();

        res.status(200);
        res.json({
            message: 'Success Edit Salary',
            data: detailSalary
        });

      }

    }catch (err){
        console.log(err)
        res.status(500);
        res.json({
          message: 'Failed Edit Salary',
          data: {}
        })
      }

}
