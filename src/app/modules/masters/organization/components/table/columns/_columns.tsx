import { ColumnDef } from "@tanstack/react-table";
import { OrganizationModel } from "../../../core/_models";
import { OrganizationCustomHeader } from "./OrganizationCustomHeader";
import { OrganizationActionsCell } from "./OrganizationActionsCell";
import { DateCell } from "../../../../../shared/components/table/columns/DateCell";

const organizationsColumns: ColumnDef<OrganizationModel>[] = [
    {
        header: (props) => <OrganizationCustomHeader tableProps={props} title="ID" className="min-w-100px" />,
        id: 'id',
        accessorKey: 'organization_id'
    },
    {
        header: (props) => <OrganizationCustomHeader tableProps={props} title="Category" className="min-w-125px" />,
        id: 'category_name',
        accessorKey: 'category_name'
    },
    {
        header: (props) => <OrganizationCustomHeader tableProps={props} title="Name" className="min-w-125px" />,
        id: 'name',
        accessorKey: 'name'
    },
    {
        header: (props) => <OrganizationCustomHeader tableProps={props} title="Created" className="min-w-100px" />,
        id: 'created_at',
        cell: (info) => <DateCell date={info.row.original.created_at} />
    },
    {
        header: (props) => <OrganizationCustomHeader tableProps={props} title="Updated" className="min-w-100px" />,
        id: 'updated_at',
        cell: (info) => <DateCell date={info.row.original.updated_at} />
    },
    {
        header: (props) => <OrganizationCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />,
        id: 'actions',
        cell: (info) => <OrganizationActionsCell id={info.row.original.organization_id} />
    }
]

export { organizationsColumns }