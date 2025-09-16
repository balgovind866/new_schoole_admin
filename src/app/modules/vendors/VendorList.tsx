import { KTCard } from "../../../_metronic/helpers"
import { Content } from "../../../_metronic/layout/components/content"
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar"
import { useLayout } from "../../../_metronic/layout/core"
// import { VendorListPagination } from "./components/table/VendorListPagination"
import { VendorsTable } from "./components/table/VendorsTable"
import { QueryResponseProvider } from "./core/QueryResponseProvider"
import { VendorListViewProvider } from "./core/VendorListProvider"
import { VendorQueryRequestProvider } from "./core/VendorQueryRequestProvider"





const VendorList = () => {
    return(
        <KTCard className="m-4">
            <VendorsTable />
        </KTCard>
    )
}


const VendorListWrapper = () => {

    const {setToolbarType} = useLayout()
    setToolbarType('vendors')

    return(
       <VendorQueryRequestProvider>
        <QueryResponseProvider>
            <VendorListViewProvider>
                <ToolbarWrapper />
                   <Content>
                      <VendorList />
                   </Content>
                {/* </ToolbarWrapper> */}
            </VendorListViewProvider>
        </QueryResponseProvider>
       </VendorQueryRequestProvider>
    )
}

export {VendorListWrapper}