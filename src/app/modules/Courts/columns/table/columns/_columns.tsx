import { ColumnDef } from "@tanstack/react-table"
import { CourtActionCell } from "./CourtActionCell"
import { CourtCustomHeader } from "./CourtCustomHeader"
import { CourtModel } from "../../../core/_model"

const CourtColumns: ColumnDef<CourtModel>[] = [
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Court ID" className="min-w-100px" />
    ),
    accessorKey: "club_id",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Name" className="min-w-150px" />
    ),
    accessorKey: "name",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Address" className="min-w-180px" />
    ),
    accessorKey: "address",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="City" className="min-w-120px" />
    ),
    accessorKey: "city",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="State" className="min-w-120px" />
    ),
    accessorKey: "state",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Country" className="min-w-120px" />
    ),
    accessorKey: "country",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Postal Code" className="min-w-120px" />
    ),
    accessorKey: "postal_code",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Coordinates" className="min-w-150px" />
    ),
    id: "coordinates",
    cell: ({ row }) =>
      `${row.original.latitude ?? "-"}, ${row.original.longitude ?? "-"}`,
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Type" className="min-w-120px" />
    ),
    accessorKey: "court_type",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Facilities" className="min-w-200px" />
    ),
    accessorKey: "facilities",
    cell: ({ getValue }) => getValue() ?? "-",
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Active" className="min-w-100px" />
    ),
    accessorKey: "is_active",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Featured" className="min-w-100px" />
    ),
    accessorKey: "is_featured",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    header: (props) => (
      <CourtCustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />
    ),
    id: "actions",
    cell: (info) => <CourtActionCell id={info.row.original.club_id} />,
  },
]

export { CourtColumns }
