import db from '../../../../libs/db'

export default async function handler(req, res) {
  if(req.method !== 'GET') return res.status(405).end();

  //need add auth

  try {
    const allEmployee = await db('employee');

    res.status(200);
    res.json({
      message: 'Success get All Employee',
      data: allEmployee
    })

  } catch (err) {
    console.log(err)

    res.status(500);
    res.json({
      message: 'Failed get All Employee',
      data: {}
    })

  }
}
