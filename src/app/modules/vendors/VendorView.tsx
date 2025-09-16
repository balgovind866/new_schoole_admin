import { useEffect } from "react";
import { VendorProfileHeader } from "./components/view/VendorProfileHeader";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";


const VendorsView = () => {

    const id = "123";

    useEffect(() => {
        console.log(id);
    } , [id])

    return(
        <>
        <VendorProfileHeader  id={id} />
        </>     
    )
}

const VendorsViewWrapper = () => {
    const id = "123"

    useEffect(() => {
        console.log(id);
    } , [id])

    return(
        <>
        <ToolbarWrapper />
        <Content>
            <VendorsView />
        </Content>
        </>
    )
}

export {VendorsViewWrapper}