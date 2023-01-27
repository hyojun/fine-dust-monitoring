class CardModel {
    key: string;
    location: string;
    station: string;
    datetime: string;
    grade: string | null;
    metric: string | null;
    
    constructor(
        division: string,
        subdivision: string,
        datetime: string,
        grade: string | null,
        metric: string | null) {
        this.key = `${division}-${subdivision}`;
        this.location = division;
        this.station = subdivision;
        this.datetime = datetime;
        this.grade = grade;
        this.metric = metric;
    }
}

export default CardModel;