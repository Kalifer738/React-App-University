//import * as React from 'react';

class Vacation {
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

export { Vacation };