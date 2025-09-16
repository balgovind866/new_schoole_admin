import { FC, useContext, useEffect, useMemo, useState } from "react"
import {
    createResponseContext, initialQueryResponse, initialQueryState, PaginationState, QUERIES, stringifyRequestQuery, WithChildren
} from "../../../../_metronic/helpers"
import { VendorViewModel } from "./_models"
import { useVendorQueryRequest } from "./VendorQueryRequestProvider"  // Assuming you have a hook for vendor query request
import { useQuery } from "@tanstack/react-query"
// import { getVendors } from "./_requests" // Ensure this is the function that fetches the vendor data

const QueryResponseContext = createResponseContext<VendorViewModel>(initialQueryResponse)

const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
    console.log('state');
    const { state } = useVendorQueryRequest()  // Use the vendor query request hook
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])
    
    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const { isFetching, refetch, data: response } = useQuery({
        queryKey: [`${QUERIES.VENDOR_LIST}-${query}`],  // Query key specific for vendors
        queryFn: () => getVendors(query),  // Assuming `getVendors` fetches vendor data
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (response) {
            console.log("Fetched Vendor Data:", response);
        }
    }, [response]);

    useEffect(() => {
        console.log("Fetched Vendor Data:");
     }, []);

    return (
        <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryResponseContext.Provider>
    )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
    const { response } = useQueryResponse()
    if (!response) {
        return []
    }

    return response?.data || []
}

const useQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const { response } = useQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useQueryResponseLoading = (): boolean => {
    const { isLoading } = useQueryResponse()
    return isLoading
}

export {
    QueryResponseProvider,
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading,
}
