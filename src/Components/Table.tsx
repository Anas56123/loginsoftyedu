import React, { useEffect, useState } from "react";
import type { CheckboxOptionType, GetProp, TableProps } from "antd";
import { Table, ConfigProvider, Checkbox, Switch } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import supabase from "@/Data/Supabase/Supabase";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  createdAt: string;
  nationality: string;
  age_groupe: string;
  company_name: string;
  points_balance: number;
  github_link: string;
  linkedin_link: string;
  discord_id: string;
  website_link: string;
  job_title: string[];
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => name,
    key: "1",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "2",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "3",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "4",
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    key: "5",
  },
  {
    title: "Age Group",
    dataIndex: "age_groupe",
    key: "6",
  },
  {
    title: "Job Title",
    dataIndex: "job_title",
    render: (jobTitles: string[]) => jobTitles.join(", "),
    key: "7",
  },
  {
    title: "Company Name",
    dataIndex: "company_name",
    key: "8",
  },
  {
    title: "Points Balance",
    dataIndex: "points_balance",
    key: "9",
  },
  {
    title: "GitHub Link",
    dataIndex: "github_link",
    key: "10",
  },
  {
    title: "LinkedIn Link",
    dataIndex: "linkedin_link",
    key: "11",
  },
  {
    title: "Discord ID",
    dataIndex: "discord_id",
    key: "12",
  },
  {
    title: "Website Link",
    dataIndex: "website_link",
    key: "13",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "14",
  },
];

const defaultCheckedList = columns.map((item) => item.key as string);
const realDefaultCheckedList = defaultCheckedList;

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [filteredColumns, setfilteredColumns] = useState(columns);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));

  const fetchData = async () => {
    setLoading(true);

    let { data: students, error } = await supabase.from("students").select("*");

    if (error) {
      setLoading(false);
      return console.error(error);
    }

    if (students) {
      setLoading(false);
      setData(students);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.pageSize,
    tableParams.sortOrder,
    tableParams.sortField,
  ]);

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const onChange = (key: React.Key | undefined, checked: boolean) => {
    console.log(defaultCheckedList);
    if (!key) {
      return;
    }
    if (checked) {
      const missingColumns = columns.filter((column) => column.key === key);
      const originalIndex = columns.findIndex((column) => column.key === key);

      console.log(missingColumns);
      const updatedFilteredColumns = [
        ...filteredColumns.slice(0, originalIndex),
        missingColumns[0],
        ...filteredColumns.slice(originalIndex),
      ];

      setfilteredColumns(updatedFilteredColumns);
    } else {
      console.log(filteredColumns);
      setfilteredColumns(filteredColumns.filter((chkey) => chkey.key != key));
      setCheckedList(realDefaultCheckedList);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {newColumns.map((column) => (
          <div key={column.key} className="flex gap-2">
            <Switch
              defaultChecked
              onChange={(checked) => onChange(column.key, checked)}
            />
            <p>{String(column.title)}</p>
          </div>
        ))}
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F4F7FB",
              headerColor: "#778BAA",
            },
          },
        }}
      >
        <Table
          columns={filteredColumns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={{
            ...tableParams.pagination,
            showSizeChanger: true,
            pageSizeOptions: [8, 10, 20, 50],
            // itemRender: (page, type, original) => (
            //   <>{type == "next" || type == "prev" ? type : <div className="border border-purple-600 m-0">{page}</div>}</>
            // ),
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      </ConfigProvider>
    </>
  );
};

export default App;
