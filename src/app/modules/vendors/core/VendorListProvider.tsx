import { FC, useState, createContext, useContext, useMemo } from 'react'
import {
    ID,
    calculatedGroupingIsDisabled,
    calculateIsAllDataSelected,
    groupingOnSelect,
    initialListView,
    ListViewContextProps,
    groupingOnSelectAll,
    WithChildren,
} from '../../../../_metronic/helpers'
import { useQueryResponse, useQueryResponseData } from './QueryResponseProvider'; // Assuming vendor's query response
import { AlertModel, initialAlertModel } from '../../shared/models/_models'

const VendorListViewContext = createContext<ListViewContextProps>(initialListView)

const VendorListViewProvider: FC<WithChildren> = ({ children }) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const { isLoading } = useQueryResponse() // Use the vendor-specific query response hook
    const data = useQueryResponseData() // Fetch vendor data
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    const [alertForDrawer, setAlertForDrawer] = useState<AlertModel>(initialAlertModel)

    return (
        <VendorListViewContext.Provider
            value={{
                selected,
                itemIdForUpdate,
                setItemIdForUpdate,
                disabled,
                isAllSelected,
                onSelect: (id: ID) => {
                    groupingOnSelect(id, selected, setSelected) // Use this method for selecting a vendor
                },
                onSelectAll: () => {
                    groupingOnSelectAll(isAllSelected, setSelected, data) // Select all vendors
                },
                clearSelected: () => {
                    setSelected([]) // Clear selection of vendors
                },
                alertForDrawer,
                setAlertForDrawer,
            }}
        >
            {children}
        </VendorListViewContext.Provider>
    )
}

const useVendorListView = () => useContext(VendorListViewContext) // Hook to access the context

export { VendorListViewProvider, useVendorListView }
