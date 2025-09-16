import { useQueries } from "@tanstack/react-query"
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers"
import { useListView } from "../../core/ListViewProvider"
import { getOrganizationById } from "../../core/_requests"
import { OrganizationForm } from "./OrganizationForm"
import { Loader } from "../../../../shared/components/Loader"
import { initialAddress } from "../../../../shared/models/_models"

const OrganizationFormWrapper = () => {

    const { itemIdForUpdate } = useListView()
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

    const [organizationQuery] = useQueries({
        queries: [
            {
                queryKey: [`${QUERIES.ORGANIZATION_LIST}/${itemIdForUpdate}`],
                queryFn: () => getOrganizationById(itemIdForUpdate),
                enabled: enabledQuery
            }
        ]
    })

    const {
        isLoading,
        data: organization,
        error
    } = organizationQuery

    if (!isLoading && !itemIdForUpdate && !error) {
        return (
            <OrganizationForm
                isOrganizationLoading={isLoading}
                organization={{ organization_id: undefined }}
                categoryList={[]} // Or remove this prop if it's no longer needed
            />
        )
    }

    if (!isLoading && !error && organization) {

        const organizationValues = {
            ...organization.data,
            address: organization.data.address_id === null ? initialAddress : organization.data.address
        }

        return (
            <OrganizationForm
                isOrganizationLoading={isLoading}
                organization={organizationValues}
                categoryList={[]} // Or remove this prop if it's no longer needed
            />
        )
    }

    if (isLoading) {
        return <Loader />
    }

    return null
}

export { OrganizationFormWrapper }
