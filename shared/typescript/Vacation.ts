//Create a typescript module with a class called Vacation, this class contains an ID, Title, Bodytext and a URL to a picture.

export class Vacation {
    id: number;
    title: string;
    bodyText: string;
    pictureURL: string;

    constructor(id: number, title: string, bodyText: string, pictureURL: string) {
        this.id = id;
        this.title = title;
        this.bodyText = bodyText;
        this.pictureURL = pictureURL;
    }
}