import { KTCard } from "../../../../_metronic/helpers"
import { Content } from "../../../../_metronic/layout/components/content"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { useLayout } from "../../../../_metronic/layout/core"
import { OrganizationDrawer } from "./components/forms/OrganizationDrawer"
import { OrganizationTable } from "./components/table/OrganizationTable"
import { ListViewProvider } from "./core/ListViewProvider"
import { QueryRequestProvider } from "./core/QueryRequestProvider"
import { QueryResponseProvider } from "./core/QueryResponseProvider"

const OrganizationList = () => {
    return (
        <>
            <KTCard className="m-4">
                <OrganizationTable />
            </KTCard>
        </>
    )
}

const OrganizationListWrapper = () => {

    const { setToolbarType } = useLayout()
    setToolbarType('organization')

    return (
        <QueryRequestProvider>
            <QueryResponseProvider>
                <ListViewProvider>
                    <ToolbarWrapper />
                    <Content>
                        <OrganizationList />
                        <OrganizationDrawer />
                    </Content>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

export { OrganizationListWrapper }
