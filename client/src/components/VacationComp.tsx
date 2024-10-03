import * as React from 'react';
import { useParams } from 'react-router-dom';
import { inherits } from 'util';

export interface IVacation {
    id: number;
    title: string;
    bodyText: string;
    pictureURL: string;
}

export type VacationProps = {
    vacation: Vacation | undefined;
    child?: React.ReactNode | undefined;
}

class Vacation implements IVacation {
    public id: number;
    public title: string;
    public bodyText: string;
    public pictureURL: string;

    constructor(id: number, title: string, bodyText: string, pictureURL: string) {
        this.id = id;
        this.title = title;
        this.bodyText = bodyText;
        this.pictureURL = pictureURL;
    }
}

const VacationComp = ({ vacation, child }: VacationProps) => {
    if (vacation === undefined) {
        return <span>Missing Vacation Information.</span>;
    }



    return (
        <div className='card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg' style={{ "backgroundImage": `url("${vacation.pictureURL}")` }}>
            <div className='d-flex flex-column h-100 text-white text-shadow-1'>
                <div className='p-3 pb-0' key={vacation.id} >
                    <h3 className='display-6 fw-bold'>{vacation.title}</h3>
                    <span>{vacation.bodyText}</span>
                </div>
                {child ? child : <></>}
            </div>
        </div>
    )
}

export { Vacation, VacationComp };

export default VacationComp;