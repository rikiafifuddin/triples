// import the necessary node libraries
import fs from 'fs';
import puppeteer from 'puppeteer';
import handlers from 'handlebars';

export default async (req, res) => {
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator

  const {
    id,
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
    salaryDate,
    fullName,
    sumSalaryPlus,
    sumSalaryMin,
    sumSalary,
    perusahaan,
    jobSkill,
    bpjsKesehatan,
    bpjsTK,
    noRekening
  } = JSON.parse(req.body);

  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync('./src/pages/api/invoice-template.html', 'utf8');

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);

    const html = template({
      id,
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
      salaryDate,
      fullName,
      sumSalaryPlus,
      sumSalaryMin,
      sumSalary,
      perusahaan,
      jobSkill,
      bpjsKesehatan,
      bpjsTK,
      noRekening
    });

    // simulate a chrome browser with puppeteer and navigate to a new page
    //uncomment for development
    // const browser = await puppeteer.launch();

    //this uncomment for production
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    // send the result to the client
    res.statusCode = 200;
    res.send(pdf);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
