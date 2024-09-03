import { Checkbox, Pagination } from "antd";
import React, { useState } from "react";
import type { PaginationProps } from "antd";

interface Column<T> {
  title: string;
  dataIndex: keyof T;
  key: string;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
}

interface DataSourceItem {
  key: string;
  [key: string]: any;
}

interface CustomTableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  onRowSelect: (selectedRows: T[]) => void;
  dataLength: number;
  setItemsPerPage: (value: number) => void;
  setCurrentPage: (value: number) => void;
  currentPage: number;
}

const CustomTable = <T extends DataSourceItem>({
  columns,
  dataSource,
  onRowSelect,
  dataLength,
  setItemsPerPage,
  setCurrentPage,
  currentPage,
}: CustomTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log({ current, pageSize });
    setItemsPerPage(pageSize)
  };

  const onChangePagenation: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleSelectRow = (record: T, selected: boolean) => {
    let newSelectedRows = [...selectedRows];
    if (selected) {
      newSelectedRows.push(record);
    } else {
      newSelectedRows = newSelectedRows.filter((row) => row.key !== record.key);
    }
    setSelectedRows(newSelectedRows);
    onRowSelect(newSelectedRows);
  };

  const handleSelectAll = (selected: boolean) => {
    const newSelectedRows = selected ? dataSource : [];
    setSelectedRows(newSelectedRows);
    onRowSelect(newSelectedRows);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F4F7FB]">
            <tr>
              <th className="px-6 py-3 w-5">
                <Checkbox
                  checked={selectedRows.length === dataSource.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-[#778BAA] uppercase tracking-wider"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataSource.map((row) => (
              <tr key={row.key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Checkbox
                    checked={selectedRows.some(
                      (selectedRow) => selectedRow.key === row.key
                    )}
                    onChange={(e) => handleSelectRow(row, e.target.checked)}
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {col.render
                      ? col.render(row[col.dataIndex], row)
                      : row[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="w-full flex justify-end">
        <Pagination
          showSizeChanger
          showQuickJumper
          defaultPageSize={5}
          onShowSizeChange={onShowSizeChange}
          current={currentPage}
          pageSizeOptions={[5,8,10,20]}
          onChange={onChangePagenation}
          total={dataLength}
        />
      </div>
    </>
  );
};

export default CustomTable;
