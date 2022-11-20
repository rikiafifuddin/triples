import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405).end();

    const { id } = req.query;

    try{
      const salaryJoin = await db('salary').where( {id} ).first()

      const sumSalaryPlus = salaryJoin?.insentif + salaryJoin?.baseSalary + salaryJoin?.OT + salaryJoin?.OTBKOorLP + salaryJoin?.LPBL + salaryJoin?.salaryDifferencePlus + salaryJoin?.OTLalu ;
      const sumSalaryMin = salaryJoin?.absensi + salaryJoin?.salaryDifferenceMin + salaryJoin?.BPJSTK + salaryJoin?.BPJSKES + salaryJoin?.PPH21 + salaryJoin?.other1 + salaryJoin?.other2 + salaryJoin?.other3;
      const sumSalary = sumSalaryPlus - sumSalaryMin

      salaryJoin.sumSalaryPlus = sumSalaryPlus;
      salaryJoin.sumSalaryMin = sumSalaryMin;
      salaryJoin.sumSalary = sumSalary;

      res.status(200);
      res.json({
          message: 'Get Detail Salary',
          data: salaryJoin
      });
    }catch (err){
        console.log(err)
        res.status(500);
        res.json({
          message: 'Failed Get Detail Salary',
          data: {}
        })
      }

}
