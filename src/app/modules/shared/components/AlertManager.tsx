import clsx from "clsx"
import { FC } from "react"
import { AlertType } from "../models/_models"


type Props = {
    headingText?: string
    message: string
    type: AlertType
}

const AlertManager: FC<Props> = ({ message, headingText, type }) => {

    return (
        <>
            <div className={clsx(
                'alert d-flex align-items-center p-5 mb-10',
                { 'alert-success': type === 'success' },
                { 'alert-warning': type === 'warning' },
                { 'alert-danger': type === 'danger' },
                { 'alert-primary': type === 'processing' }
            )}>
                <i className={clsx(
                    'fs-2tx me-4',
                    { 'ki-duotone ki-shield-tick text-primary': type === 'success' },
                    { 'ki-duotone ki-information-5 text-warning': type === 'warning' },
                    { 'ki-duotone ki-information-5 text-danger': type === 'danger' },
                    { 'fa-solid fa-spinner fa-spin text-primary': type === 'processing' }
                )}>
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                </i>


                <div className="d-flex flex-column">
                    <h5 className="mb-1">{headingText}</h5>
                    <span>{message}</span>
                </div>
            </div>
        </>
    )
}

export { AlertManager }

