import IntrinsicAttributes from 'react'
import { Link, Outlet } from 'react-router-dom'


type NavigationMenuCompProp = {

}

const NavigationMenuComp = () => {
    return (
        <>
            <div className='container-fluid bg-white p-2 pb-0 m-0 '>
                <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
                    <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
                        <li>
                            <Link className='nav-link px-2 link-body-emphasis' to='/'>Home</Link>
                        </li>
                        <li>
                            <Link className='nav-link px-2 link-body-emphasis' to='/'>About</Link>
                        </li>
                        <li>
                            <Link className='nav-link px-2 link-body-emphasis' to='/'>Vacations</Link>
                        </li>
                    </ul>
                </header>
            </div>
            <Outlet />
        </>
    )
}

export default NavigationMenuComp;