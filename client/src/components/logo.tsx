
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link 
    to="/" 
    className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-tight"
  >
    PShop
  </Link>  )
}

export default Logo