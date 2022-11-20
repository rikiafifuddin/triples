import db from '../../../../../libs/db';
import _ from 'lodash';

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    const { month } = req.body
    const { id } = req.query;
    const monthValue = month ? month : new Date().getMonth();

    try{
      const salaryJoin = await db('salary').where( {employeeID: id} ).andWhereRaw(`EXTRACT(MONTH FROM salaryDate) = ?`, [monthValue]).first()
      const detailEmployee = await db('employee').where({employeeID: id}).first()

      let result = {
        ...salaryJoin,
        ...detailEmployee
      }

      let sumSalaryPlus = 0
      let sumSalaryMin = 0
      let sumSalary = 0

      sumSalaryPlus = salaryJoin?.insentif + salaryJoin?.baseSalary + salaryJoin?.OT + salaryJoin?.OTBKOorLP + salaryJoin?.LPBL + salaryJoin?.salaryDifferencePlus + salaryJoin?.OTLalu ;
      sumSalaryMin = salaryJoin?.absensi + salaryJoin?.salaryDifferenceMin + salaryJoin?.BPJSTK + salaryJoin?.BPJSKES + salaryJoin?.PPH21 + salaryJoin?.other1 + salaryJoin?.other2 + salaryJoin?.other3;
      sumSalary = sumSalaryPlus - sumSalaryMin

      if (!isNaN(sumSalaryPlus)) { result.sumSalaryPlus = sumSalaryPlus }
      if (!isNaN(sumSalaryMin)) { result.sumSalaryMin = sumSalaryMin }
      if (!isNaN(sumSalary)) { result.sumSalary = sumSalary }

      res.status(200);
      res.json({
          message: 'Get Detail Salary for employee dashboard',
          data: result
      });
    }catch (err){
        console.log(err)
        res.status(500);
        res.json({
          message: 'Failed Get Detail Salary for employee dashboard',
          data: {}
        })
      }

}
