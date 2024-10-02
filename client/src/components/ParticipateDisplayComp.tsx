import { useParams, useSearchParams } from 'react-router-dom';
import { VacationComp, Vacation } from './VacationComp';
import * as React from 'react';

export type ParticipateDisplayCompProp = {
    vacations: Array<Vacation> | undefined;
    chosenVacationId: number;
}

const ParticipateDisplayComp = ({ vacations }: ParticipateDisplayCompProp, { chosenVacationId }: ParticipateDisplayCompProp) => {
    
    let [searchParams, _] = useSearchParams();
    let paramId = searchParams.get('id');

    if(vacations === undefined || vacations.length === 0) {
        return (
            <div>
                <p>No vacations found.</p>
            </div>
        );
    }
    else if (chosenVacationId == 0 || chosenVacationId === undefined || chosenVacationId < 0 || chosenVacationId >= vacations.length)
    {
        chosenVacationId = paramId ? parseInt(paramId) : 0;
    }

    let currentVacation = vacations.find(obj => obj.id === chosenVacationId);

    return (
        <div className='container-fluid px-4 py-5'>
            <h2 className='pb-2 border-bottom'>Reserve {currentVacation?.title}</h2>
            <VacationComp vacation={currentVacation} child={<div className='container-fluid mt-3 bg-black h-20'>asdasd<br /><br /><br /><br /></div>} />
        </div>
    )
}

export { ParticipateDisplayComp };

export default ParticipateDisplayComp;