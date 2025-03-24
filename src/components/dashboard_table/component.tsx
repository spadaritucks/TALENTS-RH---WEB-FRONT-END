import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Counter from "../counter/component"
import { ReactNode } from "react"
import './component.scss'

interface DashboardTableProps{
    tableHeads : string[]
    tableBody: ReactNode
    title: string
}

export default function DashboardTable({tableHeads, tableBody, title} : DashboardTableProps) {

    return (

        <div className="dashboard-table">
            <h2>{title}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableHeads.map((tableHead)=> <TableCell key={tableHead}>{tableHead}</TableCell>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableBody}
                </TableBody>
            </Table>
        </div>
    )
}