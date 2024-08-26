import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import {
  Table,
  ConfigProvider,
  Switch,
  Button,
  Input,
  Popover,
  Select,
} from "antd";
import type { SorterResult } from "antd/es/table/interface";
import supabase from "@/Data/Supabase/Supabase";
import {
  CirclePlus,
  EllipsisVertical,
  Filter,
  Layers,
  Mail,
  Pencil,
  Trash2,
  User,
} from "lucide-react";
import Image from "next/image";
import AsidePopup from "./AsidePopup";
import { insertStudents } from "@/Data/INSERT/insertStudents";
import AsidePop from "./Aside";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  id: number;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  address: string | null;
  nationality: string | null;
  job_title: string[] | null;
}
[];

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
    render: (name) => (!name ? "-" : name),
    key: "1",
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (col) => (!col ? "-" : col),
    key: "2",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    render: (col) => (!col ? "-" : col),
    key: "3",
  },
  {
    title: "Address",
    dataIndex: "address",
    render: (col) => (!col ? "-" : col),
    key: "4",
  },

  {
    title: "Nationality",
    dataIndex: "nationality",
    render: (col) => (!col ? "-" : col),
    key: "5",
  },
  {
    title: "Job Title",
    dataIndex: "job_title",
    render: (jobTitles: string[]) => (!jobTitles ? "-" : jobTitles.join(", ")),
    key: "7",
  },
  {
    title: "action",
    dataIndex: "action",
    render: (_, record) => (
      <Popover
        content={
          <div className="flex flex-col gap-5">
            <Button
              className="text-lg border-transparent hover:!border-transparent shadow-none text-gray-400 !justify-start"
              icon={<Pencil className="text-black" size={20} />}
            >
              Edit
            </Button>
            <Button
              className="text-lg border-transparent hover:!border-transparent shadow-none text-gray-400"
              icon={<Trash2 size={20} className="text-red-600" />}
            >
              Delete
            </Button>
          </div>
        }
        placement="bottomRight"
        trigger="click"
      >
        <Button
          className="bg-transparent border-transparent hover:!bg-transparent hover:!border-transparent shadow-none"
          icon={<EllipsisVertical size={20} />}
        />
      </Popover>
    ),
    key: "8",
  },
];

const defaultCheckedList = columns.map((item) => item.key as string);
const realDefaultCheckedList = defaultCheckedList;

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [filteredColumns, setfilteredColumns] = useState(columns);
  const [hideFilters, setHideFilters] = useState<boolean>(false);
  const [iUE, setIUE] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    insertStudents()
  };

  const newColumns = columns.map((item) => {
    console.log({ item });
    if (item.title === "action") return null;
    return {
      ...item,
      hidden: !checkedList.includes(item?.key as string),
    };
  });

  console.log({ newColumns });

  const fetchData = async () => {
    setLoading(true);

    let { data: students, error } = await supabase
      .from("students")
      .select("*")
      .or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tableParams.pagination?.pageSize,
    tableParams.sortOrder,
    tableParams.sortField,
    searchQuery,
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
        <Input
          placeholder="Placeholder"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="w-96"
        />
        <div className="flex items-center justify-end gap-2">
          <Button
            className="bg-white text-[#6c48ca] border border-[#6c48ca] hover:!bg-white hover:!text-[#6d48ca87] hover:!border-[#6d48ca87]"
            type="primary"
            size="large"
            icon={<Layers size={20} />}
            onClick={() => setHideFilters(!hideFilters)}
          >
            Columns
          </Button>
          <Button
            className="bg-white text-[#647fa8] border border-[#647fa8] hover:!bg-white hover:!text-[#4096ff] hover:!border-[#4096ff]"
            type="primary"
            size="large"
            icon={<Filter size={20} />}
          >
            Filters
          </Button>
          <Button
            className="h-11"
            type="primary"
            size="large"
            icon={<CirclePlus size={20} />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add New Student
          </Button>
        </div>
        <div>
        <AsidePop setClose={() => setIsModalOpen(false)} setIUE={setIUE} iUE={iUE} isOpen={isModalOpen} handleOk={handleOk} />
        </div>
        <br />
        <div className={`${!hideFilters ? "hidden" : ""}`}>
          <div className={`flex flex-wrap gap-8`}>
            {newColumns.map(
              (column) =>
                column && (
                  <div key={column?.key} className="flex gap-3">
                    <Switch
                      defaultChecked
                      onChange={(checked) => onChange(column?.key, checked)}
                    />
                    <p>{String(column?.title)}</p>
                  </div>
                )
            )}
          </div>
          <br />
        </div>

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
          rowSelection={{
            type: "checkbox",
          }}
        />
      </ConfigProvider>
    </>
  );
};

export default App;
