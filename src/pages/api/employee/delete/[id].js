import db from '../../../../../libs/db';

export default async function handler(req, res) {
  if(req.method !== 'DELETE') return res.status(405).end();

    const { id } = req.query;

    try{
      const deleteRow = await db('employee').where({ employeeID : id }).del();

      res.status(200);
      res.json({
          message: 'Deleted Employee successfully'
      });

    }catch (err){
        console.log(err)
        res.status(500);
        res.json({
          message: 'Failed Delete Employee',
        })
      }

}
