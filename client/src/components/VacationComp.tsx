import * as React from 'react';
import { useParams } from 'react-router-dom';
import { inherits } from 'util';

export interface IVacation {
    id: number;
    title: string;
    bodyText: string;
    pictureURL: string;
    maxUsers: number;
    userCount: number;
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
    public maxUsers: number;
    public userCount: number;

    constructor(id: number, title: string, bodyText: string, pictureURL: string, maxUsers: number, userCount: number) {
        this.id = id;
        this.title = title;
        this.bodyText = bodyText;
        this.pictureURL = pictureURL;
        this.maxUsers = maxUsers;
        this.userCount = userCount;
    }
}

const VacationComp = ({ vacation, child }: VacationProps) => {
    if (vacation === undefined) {
        return <span>Missing Vacation Information.</span>;
    }



    return (
        <div className='card card-cover h-100 overflow-hidden rounded-4 shadow-lg' key={vacation.id}>
            <div className='d-flex flex-column text-white' style={{ backgroundSize: 'cover', backgroundPositionY: '5%' ,backgroundImage: `url("${vacation.pictureURL}")`, height: "350px" }}>
                <div className='p-3 pb-0'>
                    <div className='d-flex justify-content-between'>
                        <h3 className='rounded bg-primary text-white display-7 fw-bold p-1'>{vacation.title}</h3>
                        <div>
                            <span className="badge position-relative text-bg-primary">
                                Availability
                                <span className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-" + (vacation.maxUsers - vacation.userCount > 5 ? "info" : "danger")}>
                                    {vacation.userCount}/{vacation.maxUsers}
                                    <span className="visually-hidden">Availability</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <p className='p-3 pb-0 mb-1 text-center'>{vacation.bodyText}</p>
            <hr className='pt-0 mt-0'></hr>
            {child ? child : <></>}
        </div>
    )
}

export { Vacation, VacationComp };

export default VacationComp;