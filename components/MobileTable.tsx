/* eslint-disable react/jsx-key */
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";

interface MainTableProps {
  data: any[];
}
export default function MainTable({ data }: MainTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "market cap (ZEC)",
        accessor: "marketCapZEC",
        isNumeric: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
