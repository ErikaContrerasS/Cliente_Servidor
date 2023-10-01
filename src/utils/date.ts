import moment from "moment"

export const formatDate = (date: string | Date, format?: string) => {
    if (format) return moment(date, format).format('DD/MM/YYYY')
    return moment(date).format('DD/MM/YYYY')
}

export const calculateAge = (date: string | Date) => {
    return Math.floor((Date.now() - new Date(date).getTime()) / 86400000 / 365.25)
}

export const addYear = (date: string | Date) => {
    const _date = new Date(date)
    return formatDate(
        new Date(_date.getFullYear() + 1, _date.getMonth(), _date.getDate())
    )
}