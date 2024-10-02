import { useParams } from 'react-router-dom';
import { VacationComp, Vacation, VacationProps, IVacation } from './VacationComp';
import * as React from 'react';

export type ParticipateDisplayCompProp = {
    vacations: Array<Vacation> | undefined;
    chosenVacationIndex: number;
}

const ParticipateDisplayComp = ({ vacations }: ParticipateDisplayCompProp, { chosenVacationIndex }: ParticipateDisplayCompProp) => {
    const params = useParams<'id'>();
    
    if(vacations === undefined || vacations.length === 0) {
        return (
            <div>
                <p>No vacations found.</p>
            </div>
        );
    }

    if(chosenVacationIndex == 0)
    {
        chosenVacationIndex = params.id? parseInt(params.id) : 0;
    }



    if(chosenVacationIndex < 0 || chosenVacationIndex >= vacations.length) {
        return (
            <div>
                (<VacationComp vacation={vacations[0]} />)
            </div>
        )
    }

    return (
        <div>
            (<VacationComp vacation={vacations[chosenVacationIndex]} />)
        </div>
    )
}

export { ParticipateDisplayComp };

export default ParticipateDisplayComp;