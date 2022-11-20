import AccountSettings from 'src/pages/employee/detail/employeeDetail'

  export async function getServerSideProps(ctx) {

    const { id } = ctx.query;
    const postReq = await fetch(process.env.HOST_URL+'/api/employee/detail/'+id);

    const detailEmployee = await postReq.json();

    return {
        props: {
          DetailEmployee: detailEmployee.data
        }
    }
  }

  const EmployeeDetail = (props) => {

    return (
      <AccountSettings
      detailEmployee ={props.DetailEmployee}
      >
      </AccountSettings>
    );

  };

export default EmployeeDetail;
