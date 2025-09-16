import { useEffect } from "react"
import { useListView } from "../../core/ListViewProvider"
import { useQuery } from "@tanstack/react-query"
import { isNotEmpty, QUERIES } from "../../../../../_metronic/helpers"
import { Loader } from "../../../shared/components/Loader"
import { initialCourt } from "../../core/_model"
import { getCourtById } from "../../core/_requests"
import CourtForm from "./CourtForm"

const CourtFormWrapper = () => {
    const { itemIdForUpdate } = useListView()
    const enabledQuery = isNotEmpty(itemIdForUpdate)

    useEffect(() => {
        console.log("CourtFormWrapper Mounted")
        console.log("Current itemIdForUpdate:", itemIdForUpdate)
    }, [itemIdForUpdate])

    const {
        isLoading,
        data: courtData,
        error,
    } = useQuery({
        queryKey: [`${QUERIES.COURTS_URL}/${itemIdForUpdate}`],
        queryFn: () => getCourtById(itemIdForUpdate),
        enabled: enabledQuery,
    })

    if (!isLoading && !itemIdForUpdate) {
        return <CourtForm courtData={initialCourt} isCourtLoading={false} />
    }

    if (!isLoading && !error && courtData) {
        return (
            <CourtForm
                courtData={courtData || initialCourt}
                isCourtLoading={false}
            />
        )
    }

    return <Loader />
}

export { CourtFormWrapper }
