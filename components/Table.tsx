/* eslint-disable react/jsx-key */
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useSortBy, useTable } from "react-table";

interface MainTableProps {
  data: any[];
}
export default function MainTable({ data }: MainTableProps) {
  if (typeof window === "undefined") {
    return <></>;
  }

  const width = window.innerWidth;
  const breakpoint = 620;
  const columns =
    width >= breakpoint
      ? [
          {
            Header: "#",
            accessor: "id",
          },
          {
            Header: "name",
            accessor: "name",
          },
          {
            Header: "price (Zcash)",
            accessor: "priceZcash",
            isNumeric: true,
          },
          {
            Header: "price (USD)",
            accessor: "priceUSD",
            isNumeric: true,
          },

          {
            Header: "% 1h (ZEC)",
            accessor: "percentChange1hZEC",
            isNumeric: true,
          },
          {
            Header: "% 24h (ZEC)",
            accessor: "percentChange24hZEC",
            isNumeric: true,
          },
          {
            Header: "market cap (ZEC)",
            accessor: "marketCapZEC",
            isNumeric: true,
          },
        ]
      : [
          {
            Header: "#",
            accessor: "id",
          },
          {
            Header: "name",
            accessor: "name",
          },
          {
            Header: "price (Zcash)",
            accessor: "priceZcash",
            isNumeric: true,
          },
        ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Box overflowX="auto" marginTop={{ base: 12, md: 0 }}>
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
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
