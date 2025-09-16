import { createContext, FC, useContext, useState } from "react"
import { initialQueryRequest, QueryRequestContextProps, QueryState, WithChildren } from "../../../../_metronic/helpers"







const VendorQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const VendorQueryRequestProvider : FC<WithChildren> = ({children}) => {
    const [state , setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state , ...updates} as QueryState
        setState(updateState)
    }

   return(
    <VendorQueryRequestContext.Provider value={{ state , updateState}}>
        {children}
    </VendorQueryRequestContext.Provider>
   )
}

const useVendorQueryRequest = () => useContext(VendorQueryRequestContext)
export {VendorQueryRequestProvider , useVendorQueryRequest}


