import { useParams, useSearchParams } from 'react-router-dom';
import { VacationComp, Vacation } from './VacationComp';
import * as React from 'react';

export type ParticipateDisplayCompProp = {
    vacations: Array<Vacation> | undefined;
    chosenVacationId: number;
}

const ParticipateDisplayComp = ({ vacations }: ParticipateDisplayCompProp, { chosenVacationId }: ParticipateDisplayCompProp) => {

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        //https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/#:~:text=Basic.%20Getting%20Started.%20Forms%20and%20Events.%20If%20performance%20is%20not
        const target = event.target as typeof event.target & {
            name: { value: string };
            email: { value: string };
        };

        const name = target.name.value; // typechecks!
        const email = target.email.value; // typechecks!
        alert(`The name you entered was: ${name} ${email}`);
    }


    let [searchParams, _] = useSearchParams();
    let paramId = searchParams.get('id');

    if (vacations === undefined || vacations.length === 0) {
        return (
            <div>
                <p>No vacations found.</p>
            </div>
        );
    }
    else if (chosenVacationId == 0 || chosenVacationId === undefined || chosenVacationId < 0 || chosenVacationId >= vacations.length) {
        chosenVacationId = paramId ? parseInt(paramId) : 0;
    }

    let currentVacation = vacations.find(obj => obj.id === chosenVacationId);

    return (
        <div className='container-fluid px-4 py-5'>
            <h2 className='pb-2 border-bottom'>Reserve {currentVacation?.title}</h2>
            <VacationComp vacation={currentVacation} child={
                <div className='container-fluid h-20'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group fs-3">
                            <label htmlFor="inputEmail">Names</label>
                            <input type="text" className="form-control" id="inputNames" placeholder="Enter names" />
                        </div>
                        <div className="form-group mt-2 fs-3">
                            <label htmlFor="inputEmail">Telephone</label>
                            <input type="email" className="form-control" id="inputTelephone" placeholder="Enter telephone" />
                        </div>
                        <button type="submit" className="mt-2 mb-2 btn btn-primary w-100">Reserve</button>
                    </form>
                </div>
            } />
        </div>
    )
}

export { ParticipateDisplayComp };

export default ParticipateDisplayComp;