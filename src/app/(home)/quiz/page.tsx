"use client";
import AddQuiz from "@/Components/AddQuiz";
import { insertQuiz } from "@/Data/INSERT/insertQuiz";
import supabase from "@/Data/Supabase/Supabase";
import {
  Button,
  ConfigProvider,
  Input,
  Pagination,
  PaginationProps,
} from "antd";
import {
  ArrowLeft,
  CirclePlus,
  Search,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type QuizQuestion = {
  title: string;
  type: "text-based" | "option-based" | "image-based";
};

type QuizData = {
  id: string;
  created_by: string;
  title: string;
  formation: string;
  chapter: number;
  tags: string[];
  repeat_wrong_answer: boolean;
  repeated: boolean;
  has_time: boolean;
  time: number;
  has_hearts: boolean;
  num_hearts: number;
  icon: string;
  questions: QuizQuestion[];
}[];

interface FormValues {
  title: string;
  formation: string;
  chapter: number;
  repeated: boolean;
  repeat_wrong_answer: boolean;
  has_time: boolean;
  time: number;
  has_hearts: boolean;
  num_hearts: number;
}

export default function App() {
  const [data, setData] = useState<QuizData>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataLength, setDataLength] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    let query = supabase
      .from("quizs")
      .select("*", { count: "exact" })
      .or(
        `title.ilike.%${searchQuery}%,formation.ilike.%${searchQuery}%,created_by.ilike.%${searchQuery}%`
      )
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    let { data: students, count, error } = await query;

    if (error) {
      setLoading(false);
      return console.error(error);
    }

    if (students) {
      setLoading(false);
      setDataLength(count);
      setData(students);
      setDataLength(count || 0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, itemsPerPage, currentPage]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (data: FormValues) => {
    console.log(data);
    setIsModalOpen(false);
    insertQuiz(
      data,
      "test",
      data.formation == "react" || data.formation == "javascript" || data.formation == "typescript" || data.formation == "nextjs"
        ? "https://bxigztsmavbbeybpccmv.supabase.co/storage/v1/object/sign/URL/Unofficial_JavaScript_logo_2.svg.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJVUkwvVW5vZmZpY2lhbF9KYXZhU2NyaXB0X2xvZ29fMi5zdmcucG5nIiwiaWF0IjoxNzI2NDc4Mjg2LCJleHAiOjE3NTgwMTQyODZ9.up6qKNY9xD6U93F0DtgxDPS20xUNNnlcVqor9tsP10s&t=2024-09-16T09%3A18%3A06.520Z"
        : data.formation == "python"
        ? "https://bxigztsmavbbeybpccmv.supabase.co/storage/v1/object/sign/URL/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJVUkwva2lzc3BuZy1weXRob24tY29tcHV0ZXItaWNvbnMtcHJvZ3JhbW1pbmctbGFuZ3VhZ2UtZXhlY3V0YS0xNzEzODg1NjM0NjMxLndlYnAiLCJpYXQiOjE3MjY0Nzc4NTMsImV4cCI6MTc1ODAxMzg1M30.Jb8vceOFCwTio0qQYiWYQ0OHdAP5ZPnDGVENtjhxhWk&t=2024-09-16T09%3A10%3A53.530Z"
        : data.formation == "supabase"
        ? "https://bxigztsmavbbeybpccmv.supabase.co/storage/v1/object/sign/URL/download.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJVUkwvZG93bmxvYWQuanBlZyIsImlhdCI6MTcyNjQ3ODMwMCwiZXhwIjoxNzU4MDE0MzAwfQ.sU7OtK9axjzt_-Me2nK5G-3f3Gt3SHcWLjZfrSCjO4Y&t=2024-09-16T09%3A18%3A20.987Z"
        : ""
    );
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log({ current, pageSize });
    setItemsPerPage(pageSize);
  };

  const onChangePagenation: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex h-full items-center gap-5">
          <ArrowLeft className="font-light" />
          <h1 className="text-3xl font-bold text-[#778BAA]">Library Quiz</h1>
        </div>
        <Button
          className="px-10 py-5"
          size="large"
          type="primary"
          icon={<CirclePlus size={22} />}
          onClick={() => {
            showModal();
          }}
        >
          Créer quiz
        </Button>
      </div>
      <br />
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex gap-2">
          <ConfigProvider wave={{ disabled: true }}>
            <Button>Recent</Button>
            <Button>Best</Button>
          </ConfigProvider>
        </div>
        <Input
          size="large"
          prefix={<Search />}
          className="w-96"
          placeholder="Rechercher du Quiz"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <br />
      <AddQuiz
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
      />
      <div className="w-full h-1/2 flex flex-col gap-4">
        {!loading ? (
          data?.map((data, index) => (
            <div
              className="w-full h-40 px-5 py-12 border-2 border-[#D6DAE1] shadow-box-quiz-me flex items-center rounded-xl"
              key={index}
            >
              {data?.icon ? (
                <Image
                  src={data?.icon}
                  alt=""
                  height={100}
                  width={100}
                  className="rounded-lg mr-4"
                />
              ) : null}
              <div>
                <h2 className="text-2xl font-bold">{data?.title}</h2>
                <p>
                  {data?.chapter} . {data?.formation}
                </p>
                <br />
                <div className="flex gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    {data?.created_by} <UserRound size={20} />
                  </span>
                  <span>{data?.questions?.length} Questions</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="w-full h-80 flex justify-center items-center"
            role="status"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-blue-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <br />
      <div className="w-full flex justify-end">
        <Pagination
          showSizeChanger
          showQuickJumper
          defaultPageSize={3}
          onShowSizeChange={onShowSizeChange}
          current={currentPage}
          pageSizeOptions={[3, 2, 1]}
          onChange={onChangePagenation}
          total={dataLength ? dataLength : 0}
        />
      </div>
    </div>
  );
}
