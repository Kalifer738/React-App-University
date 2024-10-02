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
        <div className='container-fluid px-4 py-5'>
            <h2 className='pb-2 border-bottom'>Vacations</h2>

            {vacations.map((vacation: Vacation, index, __) =>
            (
                <VacationComp
                    key={index}
                    vacation={vacation}
                    child={<Link className='btn btn-primary' state={{ "transform": "translateX(10px)" }} to={`/participate?id=${vacation.id}`}>Participate</Link>}
                />
            ))}
        </div>
    );
}

export { VacationDisplayComp };

export default VacationDisplayComp;