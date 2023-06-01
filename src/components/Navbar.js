import{Link} from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../blue/logo.png';
import logo_toi from '../blue/logo_toi.png';

function Navbar(){

return(
    
<nav className={styles.navbar}>
<ul className={styles.list}>
<li>
   <div>
    <img src={logo} alt="Logo"/>
    <img src={logo_toi} alt="Logo"/>
    </div>
</li>
    <h1> Supermarket </h1>


        <li className={styles.item}>
            <Link to="/">Home</Link>
        </li>
        <li className={styles.item}>
            <Link to= "/vendas"> Vendas</Link>
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
    </nav>
   
)
}
export default Navbar

