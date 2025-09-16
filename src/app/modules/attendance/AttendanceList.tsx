import { KTCard } from "../../../_metronic/helpers"
import { Content } from "../../../_metronic/layout/components/content"
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar"
import { useLayout } from "../../../_metronic/layout/core"
import { AttendanceDrawer } from "./components/forms/AttendanceDrawer"
import { AttendanceTable } from "./components/tables/AttendanceTable"


import { ListViewProvider } from "./core/ListViewProvider"
import { QueryRequestProvider } from "./core/QueryRequestProvider"
import { QueryResponseProvider } from "./core/QueryResponseProvider"

const AttendanceList = () => {
    return (
        <>
            <KTCard className="m-4">
                <AttendanceTable />
            </KTCard>
        </>
    )
}

const AttendanceListWrapper = () => {
    const { setToolbarType } = useLayout()
    setToolbarType('attendance')

    return (
        <QueryRequestProvider>
            <QueryResponseProvider>
                <ListViewProvider>
                    <ToolbarWrapper />
                    <Content>
                        <AttendanceList />
                        <AttendanceDrawer />
                    </Content>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

export { AttendanceListWrapper }
