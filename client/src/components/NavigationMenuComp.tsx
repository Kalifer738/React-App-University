import IntrinsicAttributes from 'react'

export type NavigationMenuCompProp = {
    children: Element
}

const NavigationMenuComp = (children: IntrinsicAttributes) => {
    return (
        <div>
            <ul>
                <a href='/'>Home</a>
                <a>About</a>
                <a>Vacations</a>
            </ul>
        </div>
    )
}

export default NavigationMenuComp;