import IntrinsicAttributes from 'react'

type FooterCompProp = {
    
}

const FooterComp = () => {
    return (
        
        <div className='container'>
            <footer className='py-3 my-4'>
                <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
                    <li className='nav-item'>
                        <p>Hello world! This is my footer!</p>
                    </li>
                </ul>
                <p className='text-center text-body-secondary'>© Konstantin Kostadinov</p>
            </footer>
        </div>
    )
}

export { FooterComp }

export default FooterComp;