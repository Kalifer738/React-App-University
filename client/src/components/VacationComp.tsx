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
        return <>Missing Vacation Information.</>;
    }

   

    return (
        <>
            <div key={vacation.id} >
                <span>{vacation.id}</span>
                <span>{vacation.title}</span>
                <span>{vacation.bodyText}</span>
                <span>{vacation.pictureURL}</span>
                {child ? child : <></>}
            </div >
        </>
    )
}

export { Vacation, VacationComp };

export default VacationComp;