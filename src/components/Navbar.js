import{Link} from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../blue/logo.png';
import logo_toi from '../blue/logo_toi.png';

function Navbar(){

return(
    

    <ul className={styles.list}>
    <li>
    <p>
    <img src={logo} alt="Logo"/>
    <img src={logo_toi} alt="Logo"/>
  </p>
    <p><h1> Supermarket </h1></p>
    </li>

        <li className={styles.item}>
            <Link to="/">Home</Link>
        </li>
        <li className={styles.item}>
            <Link to= "/Contato"> Contato</Link>
        </li>
        <li className={styles.item}>
            <Link to="/Cad_Prods">Cadastro Produto</Link>
        </li>
        <li className={styles.item}>
            <Link to="/ShowProducts">Products</Link>
        </li>
        <li className={styles.item}>
            <Link to="/users">Users</Link>
        </li>
    </ul>
   
)
}
export default Navbar

