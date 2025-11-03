

import  { type ReactNode } from 'react'
import useZustand from './store'

const ThemeProvider = ({children}:{children:ReactNode}) => {
const isDarkMode=useZustand(state=>state.isDarkMode)
if (isDarkMode ) {
    document.documentElement.setAttribute('data-theme',"dark" );

}
else{
    document.documentElement.setAttribute('data-theme',"light" );

}

console.log(document.documentElement.getAttribute("data-theme"))
  return (
    <div>
        {children}
    </div>
  )
}

export default ThemeProvider