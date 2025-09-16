import { ColumnDef } from "@tanstack/react-table";
import { VendorViewModel } from "../../../core/_models";
import { VendorCustomHeader } from "./VendorCustomHeader";
import { VendorActionsCell } from "./VendorActionCell";



const VendorColumn : ColumnDef<VendorViewModel>[] =[
     {
        header:(props) => <VendorCustomHeader tableProps={props} title="ID" className="min-w-100px"/>,
        id:"id",
        accessorKey: 'vendor_id'
     },
     {
        header:(props) => <VendorCustomHeader tableProps={props} title="Company" className="min-w-100px"/>,
        id:"company_name",
        accessorKey: 'company_name'
     },
     {
        header:(props) => <VendorCustomHeader tableProps={props} title="Representative Name" className="min-w-100px"/>,
        id:"representative_name",
        accessorKey: 'representative_name'
     },
     {
        header:(props) => <VendorCustomHeader tableProps={props} title="Email" className="min-w-100px"/>,
        id:"email",
        accessorKey: 'email'
     },
     {
        header:(props) => <VendorCustomHeader tableProps={props} title="vendor Type" className="min-w-100px"/>,
        id:"vendor_type",
        accessorKey: 'vendor_type'
     },
     {
        header:(props) => <VendorCustomHeader tableProps={props} title="Reg No " className="min-w-100px"/>,
        id:"registration_number",
        accessorKey: 'registration_number'
     },
     {
        header:(props) => <VendorCustomHeader tableProps={props} title=" GSt No" className="min-w-100px"/>,
        id:"gst_number",
        accessorKey: 'gst_number'
     },
     {
        header: (props) => <VendorCustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />,
        id: 'actions',
        cell: (info) => <VendorActionsCell id={info.row.original.vendor_id} />, // Use StaffActionsCell for actions
    }
]

export {VendorColumn}