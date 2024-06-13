import moment from "moment/moment";

export const expiresIn = (startDate, duration) => {
    const a = moment(startDate).add(duration, 'year');
    const b = moment()

    let years = a.diff(b, 'year')

    b.add(years, 'years')

    let months = a.diff(b, 'months')

    b.add(months, 'months')

    let days = a.diff(b, 'days')

    if (b.isAfter(a)){
        return {
            expires: 'Expires',
            start: moment(startDate).format('YYYY-MM-DD'),
            end: a.format('YYYY-MM-DD')
        }
    }

    return {
        expires: {years, months, days},
        start: moment(startDate).format('YYYY-MM-DD'),
        end: a.format('YYYY-MM-DD')
    }
}