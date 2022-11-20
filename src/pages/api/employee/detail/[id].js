import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405).end();

    const { id } = req.query;

    try{
      const detailEmployee = await db('employee').where({ employeeID : id }).first();

      res.status(200);
      res.json({
          message: 'Get Detail Employee',
          data: detailEmployee
      });
    }catch (err){
        console.log(err)
        res.status(500);
        res.json({
          message: 'Failed Get Detail Employee',
          data: {}
        })
      }

}
