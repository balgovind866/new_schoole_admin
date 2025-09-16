import { FC } from "react"
import moment from 'moment'

type Props = {
    date?: string
    format?: string
}

const DateCell: FC<Props> = ({ date, format = 'DD MMM YYYY, H:mm a' }) => {
    const formattedDate = moment(date).format(format)
    return (
        <span>{formattedDate}</span>
    )
}

export { DateCell }