"use client";
import AsidePop from "@/Components/Aside";
import CustomTable from "@/Components/CustomTable";
import { deleteStudent } from "@/Data/DELETE/deleteStudent";
import { getStudentByID } from "@/Data/GET/getStudentByID";
import { insertStudents } from "@/Data/INSERT/insertStudents";
import supabase from "@/Data/Supabase/Supabase";
import { Button, Input, Popover, Select, Switch } from "antd";
import {
  CirclePlus,
  EllipsisVertical,
  Filter,
  Layers,
  Pencil,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";

interface DataSourceItem {
  key: string;
  name: string;
  nationality: string;
  address: string;
  job_title: string;
  phone_number: string;
  email: string;
  id: number;
}

const HomePage: React.FC = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render: (name: string) => (!name ? "-" : name),
      key: "1",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (col: string) => (!col ? "-" : col),
      key: "2",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      render: (col: string) => (!col ? "-" : col),
      key: "3",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (col: string) => (!col ? "-" : col),
      key: "4",
    },

    {
      title: "Nationality",
      dataIndex: "nationality",
      render: (col: string) => (!col ? "-" : col),
      key: "5",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      render: (col: string) => (!col ? "-" : col),
      key: "6",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_: any, record: any) => (
        <Popover
          content={
            <div className="flex flex-col gap-5">
              <Button
                className="text-lg border-transparent hover:!border-transparent shadow-none text-gray-400 !justify-start"
                icon={<Pencil className="text-black" size={20} />}
                onClick={() => {
                  deleteStudent([record.id]);
                  setPopupFor("Edit");
                  setEdit({ isEdit: true, id: record.id });
                  setIsModalOpen(true);
                  fetchStudentByID(record.id);
                }}
              >
                Edit
              </Button>
              <Button
                className="text-lg border-transparent hover:!border-transparent shadow-none text-gray-400"
                icon={<Trash2 size={20} className="text-red-600" />}
                onClick={async () => {
                  setPopupFor("Edit");
                  await deleteStudent([record.id]);
                  fetchData();
                }}
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
      key: "7",
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key as string);

  const [selectedRows, setSelectedRows] = useState<DataSourceItem[]>([]);
  const [update, setUpdate] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [isSort, setIsSort] = useState<
    | {
        name: "name";
        sort: boolean;
      }
    | {
        name: "email";
        sort: boolean;
      }
    | {
        name: "phone_number";
        sort: boolean;
      }
    | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [popupFor, setPopupFor] = useState<"Add" | "Edit">("Add");
  const [deleteIds, setDeleteIds] = useState<any[]>([]);
  const [hideF, setHideF] = useState<boolean>(false);
  const [hideCF, setHideCF] = useState<boolean>(false);
  const [edit, setEdit] = useState({ isEdit: false, id: 0 });
  const [iUE, setIUE] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number | null>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentData, setStudentData] = useState<any[]>([]);
  const [filterSelect, setfilterSelect] = useState<{
    nationality: string;
    job_title: string;
  }>({ nationality: "", job_title: "" });
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.map((item) => {
    if (item.title === "action") return null;
    return {
      ...item,
      hidden: !checkedList.includes(item?.key as string),
    };
  });

  const [visibleKeys, setVisibleKeys] =
    useState<React.Key[]>(defaultCheckedList);

  console.log({ visibleKeys });

  const onChangeSwitch = (key: React.Key | undefined, checked: boolean) => {
    if (!key) {
      return;
    }

    setVisibleKeys((prevKeys) => {
      if (checked) {
        // Add the key to visibleKeys if checked
        return [...prevKeys, key];
      } else {
        // Remove the key from visibleKeys if unchecked
        return prevKeys.filter((k) => k !== key);
      }
    });
  };

  const filteredColumns = columns.filter((column) =>
    visibleKeys.includes(column.key)
  );

  const handleOk = async (data: DataSourceItem) => {
    insertStudents(data);
    setUpdate(!update);
    setIsModalOpen(false);
  };

  async function fetchStudentByID(id: number) {
    const data: any[] | never[] | null = await getStudentByID(id);
    setisLoading(true);
    if (data) {
      setisLoading(false);
      setStudentData(data);
    }
  }

  function addOrderToObjects<T extends object>(
    array: T[]
  ): (T & { key: number })[] {
    return array.map((obj, index) => ({
      ...obj,
      key: index + 1,
    }));
  }

  const handleSort = (column: string) => {
    setIsSort((prevSort) => {
      if (!prevSort || prevSort.name !== column) {
        return { name: column, sort: true }; // ascending order
      } else {
        return { name: column, sort: !prevSort.sort }; // toggle between ascending and descending
      }
    });
    setUpdate(!update);
  };

  const fetchData = async () => {
    setLoading(true);

    let query = supabase
      .from("students")
      .select("*", { count: "exact" })
      .or(
        `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone_number.ilike.%${searchQuery}%`
      )
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    console.log(filterSelect.nationality, "helooooooo");

    if (filterSelect.nationality !== "") {
      query = query.eq("nationality", filterSelect.nationality);
    }
    if (filterSelect.job_title !== "") {
      query = query.eq("job_title", filterSelect.job_title);
    }
    if (isSort !== null) {
      query = query.order(isSort?.name, { ascending: isSort?.sort });
    }

    let { data: students, count, error } = await query;

    if (error) {
      setLoading(false);
      return console.error(error);
    }

    if (students) {
      setLoading(false);
      const sutdentsAndKey = addOrderToObjects(students);
      setDataLength(count);
      setData(sutdentsAndKey);
      setDataLength(count || 0);
      console.log({ data });
    }
  };

  useEffect(() => {
    fetchData();
  }, [update, filterSelect, itemsPerPage, currentPage, isSort]);

  const handleRowSelect = (selectedRows: DataSourceItem[]) => {
    setSelectedRows(selectedRows);

    selectedRows.forEach((row) => {
      setDeleteIds([]);
      setDeleteIds([...deleteIds, row?.id]);
    });

    console.log("Selected rows:", selectedRows);
    console.log("Updated deleteIds:", deleteIds);
  };

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-between pl-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Placeholder"
            size="large"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setUpdate(!update);
            }}
            className="w-96"
          />
          <Button
            className={`${selectedRows.length >= 2 ? "" : "hidden"}`}
            icon={<Trash2 className="text-red-600" />}
            onClick={() => {
              console.log("hellooooo", { deleteIds });
              deleteStudent(deleteIds);
              setUpdate(!update);
              setDeleteIds([])
            }}
          />
          <p>
            {selectedRows.length}/{dataLength}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-white text-[#6c48ca] border border-[#6c48ca] hover:!bg-white hover:!text-[#6d48ca87] hover:!border-[#6d48ca87]"
            type="primary"
            size="large"
            icon={<Layers size={20} />}
            onClick={() => setHideCF(!hideCF)}
          >
            Columns
          </Button>
          <Button
            className="bg-white text-[#647fa8] border border-[#647fa8] hover:!bg-white hover:!text-[#4096ff] hover:!border-[#4096ff]"
            type="primary"
            size="large"
            icon={<Filter size={20} />}
            onClick={() => setHideF(!hideF)}
          >
            Filters
          </Button>
          <Button
            className="h-11"
            type="primary"
            size="large"
            icon={<CirclePlus size={20} />}
            onClick={() => {
              setPopupFor("Add");
              setIsModalOpen(true);
            }}
          >
            Add New Student
          </Button>
        </div>
      </div>

      <div>
        <AsidePop
          setClose={() => setIsModalOpen(false)}
          setIUE={setIUE}
          iUE={iUE}
          isOpen={isModalOpen}
          handleOk={handleOk}
          btnName={popupFor}
          defaultValues={
            !edit.isEdit
              ? {
                  name: "",
                  email: "",
                  job_title: "",
                  address: "",
                  phone_number: "",
                  nationality: "",
                }
              : studentData[0]
          }
        />
      </div>
      <br />
      <div className={`${!hideCF ? "hidden" : ""}`}>
        <div className={`flex flex-wrap gap-8`}>
          {newColumns.map(
            (column) =>
              column && (
                <div key={column?.key} className="flex gap-3">
                  <Switch
                    defaultChecked
                    onChange={(checked: boolean) =>
                      onChangeSwitch(column?.key, checked)
                    }
                  />
                  <p>{String(column?.title)}</p>
                </div>
              )
          )}
        </div>
        <br />
      </div>
      <div className={`${!hideF ? "hidden" : ""}`}>
        <div className="flex gap-3">
          <div className="flex gap-3 items-center">
            <p>nationality: </p>
            <Select
              size="large"
              className="w-48"
              defaultValue={"All"}
              options={[
                { value: "", label: "All" },
                { value: "tunisia", label: "🇹🇳" },
                { value: "algeria", label: "🇩🇿" },
                { value: "republic of congo", label: "🇨🇩" },
                { value: "unKnown", label: "Unknown" },
              ]}
              onChange={(value) => {
                setfilterSelect({
                  nationality: value,
                  job_title: filterSelect.job_title,
                });
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p>job title: </p>
            <Select
              size="large"
              className="w-48"
              defaultValue={"All"}
              options={[
                { value: "", label: "All" },
                { value: "front-end", label: "Front-end" },
                { value: "algeria", label: "Back-end" },
                { value: "ai", label: "AI" },
                { value: "student", label: "student" },
              ]}
              onChange={(value) => {
                setfilterSelect({
                  job_title: value,
                  nationality: filterSelect.nationality,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <CustomTable
          columns={filteredColumns}
          dataSource={data}
          onRowSelect={handleRowSelect}
          dataLength={dataLength ? dataLength : 0}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setIsSort={setIsSort}
          isSort={isSort}
          handleSort={handleSort}
        />
      </div>
    </div>
  );
};

export default HomePage;
