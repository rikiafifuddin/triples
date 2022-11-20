import db from '../../../../libs/db'

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).end();

  //need add auth
  const {
    fullName,
    email,
    identityID,
    employeeID,
    perusahaan,
    jobSkill,
    jobType,
    joinDate,
    placeofBirth,
    birthDate,
    gender,
    religion,
    phoneNumber,
    noRekening,
    education,
    motherName,
    streetAddress,
    kelurahanAddress,
    kecamatanAddress,
    kotaAddress,
    dInsurance,
    bpjsKesehatan,
    jkkother,
    noteinsurance,
  } = req.body;

  try{
    const employeeExist = await db('employee').where({employeeID}).first()
    if (employeeExist) {
      return res.status(405).json({
        message: 'Employee '+ employeeID + ' Already Exist'
      })
    }

    const addEmployee = await db('employee').insert({
      fullName,
      email,
      identityID,
      employeeID,
      perusahaan,
      jobSkill,
      jobType,
      joinDate,
      placeofBirth,
      birthDate,
      gender,
      religion,
      phoneNumber,
      noRekening,
      education,
      motherName,
      streetAddress,
      kelurahanAddress,
      kecamatanAddress,
      kotaAddress,
      dInsurance,
      bpjsKesehatan,
      jkkother,
      noteinsurance,
    });

    if (addEmployee){
      const createData = await db('employee').where('id', addEmployee).first();
      res.status(200);
      res.json({
        message: 'Add New Employee Successfully',
        data: createData
      })
    }

  } catch (err){
    console.log(err)
    res.status(500);
    res.json({
      message: 'DB error',
      data: {}
    })
  }

}
