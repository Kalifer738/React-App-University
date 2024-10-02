import { VacationComp, Vacation, VacationProps, IVacation } from './VacationComp';

export type VacationDisplayCompProp = {
    vacations: Array<Vacation> | undefined;
}

const VacationDisplayComp = ({ vacations }: VacationDisplayCompProp) => {
    if (vacations === undefined || vacations.length === 0) {
        return (
            <div>
                <p>No vacations found.</p>
            </div>
        );
    }

    return (
        <div>
            {vacations.map((vacation: Vacation, _, __) =>
            (
                <VacationComp
                    vacation={vacation}
                    child={ <a href={`/participate?id=${vacation.id}`}>Participate</a> }
                />
            ))}
        </div>
    );
}

export { VacationDisplayComp };

export default VacationDisplayComp;