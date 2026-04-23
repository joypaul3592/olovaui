"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
const rows = [
  { team: "Design", status: "Active", members: 6 },
  { team: "Engineering", status: "Active", members: 12 },
  { team: "Marketing", status: "Paused", members: 4 },
];
export function TableDefaultView() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Team</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Members</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.team}>
            <TableCell>{row.team}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.members}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default TableDefaultView;
