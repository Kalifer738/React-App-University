import { posix } from 'path';
import { VacationComp, Vacation } from './VacationComp';
import { Link, Outlet } from 'react-router-dom'
import { transform } from 'typescript';

export type VacationDisplayCompProp = {
    vacations: Array<Vacation> | undefined;
}

const VacationDisplayComp = ({ vacations }: VacationDisplayCompProp) => {
    if (vacations === undefined || vacations.length === 0) {
        return (
            <div>
                <Outlet />
                <div className='spinner-border text-light'></div>
            </div>
        );
    }

    return (
        <div className='container-fluid p-0 my-5'>
            <h2 className='pb-2 border-bottom px-4'>Vacations</h2>
            <div className='d-lg-flex flex-wrap justify-content-between'>
                {vacations.map((vacation: Vacation, index, __) =>
                (
                    <div className='w-md-25 h-md-25' style={{ flexGrow: '0', flexShrink: '0', flexBasis: '32%'}}>
                        <VacationComp
                            key={index}
                            vacation={vacation}
                            child={<Link className='btn btn-primary' state={{ "transform": "translateX(10px)" }} to={`/participate?id=${vacation.id}`}>Participate</Link>}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export { VacationDisplayComp };

export default VacationDisplayComp;