// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import Cookie from 'js-cookie'

const navigation = () => {
  const cookieRole = Cookie.get('role')

  if (cookieRole == 'user'){
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      }
    ]
  } else if (cookieRole == 'B46pvhd1ME1Tqxo'){
    return [
      {
        sectionTitle: 'Admin'
      },
      {
        title: 'Employee',
        icon: AccountPlusOutline,
        path: '/employee',
      },
      {
        title: 'Salary',
        icon: CreditCardOutline,
        path: '/salarymanagement'
      },
      {
        sectionTitle: '-'
      },
      {
        title: 'Register User ID',
        icon: CreditCardOutline,
        path: '/pages/register'
      },
    ]
  }

}

export default navigation
