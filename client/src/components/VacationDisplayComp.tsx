import { VacationComp, Vacation, VacationProps, IVacation } from './VacationComp';

export type VacationDisplayCompProp ={
    vacations: Array<Vacation> | undefined;
}

const VacationDisplayComp = ({vacations} : VacationDisplayCompProp) => {
    if(vacations === undefined) {
        return (
            <div>
                <p>No vacations found.</p>
            </div>
        );
    }
    
    return (
        <div>
            {typeof vacations === undefined ?
                (<p>Loading...</p>)
                :
                (<> {vacations.map((vacation: Vacation, _, __) => (<VacationComp vacation={vacation}></VacationComp>))} </>)}
        </div>
    );
}

export { VacationDisplayComp };

//export default VacationComp;