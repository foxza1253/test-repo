"use client";
import React, { useEffect, useState } from "react";
//components
import {
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  Modal,
  Dropdown,
  Select,
} from "antd";

//date & time
import dayjs from "dayjs";

// dayjs.extend(utc);
// dayjs.extend(timezone);

//
import axios from "axios";
import { render } from "@testing-library/react";

export default function Home() {
  const [OpenCreate, setOpenCreate] = useState(false);

  // data Emp
  const [employeeData, setEmployeeData] = useState([]);

  //loading
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState();
  const [form] = Form.useForm();

  //edit form
  const [OpenEdit, setOpenEdit] = useState(false);
  const [selectEmp, setSelectEmp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DataEmp = await axios.get(
          "https://organize-dev.allkons.com/org-center-sv/api/test-frontend"
        );
        const fetchFinal = DataEmp.data.data;
        console.log("Data Employee : ", fetchFinal);
        setEmployeeData(fetchFinal);
      } catch (error) {
        console.log("Error Fetch Data : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Lastname",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Position",
      dataIndex: "position_name",
      key: "position_name",
    },
    {
      title: "Phone",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      // render: (_, record) => (
      //   <>{dayjs(record.start_date)}</>
      //   // .tz("Thailand/Bangkok")}
      // ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={
              () => ShowEditModal(record)
              // record.id
            }
          >
            Edit
          </Button>
          <Button onClick={() => console.log("View ID: ", record.id)}>
            View
          </Button>
        </>
      ),
    },
  ];

  const handleClose = () => {
    form.resetFields();
    setOpenCreate(false);
  };

  const onsubmit = async (value) => {
    console.log("TEST submit : ", value);
    try {
      const respones = await axios.post(
        "https://organize-dev.allkons.com/org-center-sv/api/test-frontend",
        value,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("respones data : ", respones.data);

      handleClose();
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  //edit
  const ShowEditModal = (record) => {
    setSelectEmp(record);
    form.setFieldValue(record);
    setOpenEdit(true);
  };

  const CloseEdit = () => {
    form.resetFields;
    setOpenEdit(false);
  };

  const handleEdit = async (value) => {
    console.log("edit data : ", value);
  };

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setOpenCreate(true);
          }}
        >
          Create
        </Button>
      </div>

      {/* table Show data */}
      <div>
        <Table dataSource={employeeData} columns={columns} loading={loading} />
      </div>

      {/* Modal Create Data */}

      <Modal open={OpenCreate} onCancel={handleClose} footer={[]}>
        <Form form={form} onFinish={onsubmit} layout="vertical">
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position_name"
            rules={[
              {
                required: true,
                // message: "Please position!",
              },
            ]}
          >
            <Select
              options={[
                { value: "Project Manager", label: "Project Manager" },
                { value: "UX/UI", label: "UX/UI" },
                { value: "System Analynst", label: "System Analynst" },
                { value: "Software Developer", label: "Software Developer" },
                { value: "Tester", label: "Tester" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Please email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone_no"
            rules={[
              {
                required: true,
                message: "Please phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[
              {
                required: true,
                message: "Please startdate!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">submit</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal open={OpenEdit} onCancel={CloseEdit} footer={[]}>
        <Form form={form} onFinish={handleEdit} layout="vertical">
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position_name"
            rules={[
              {
                required: true,
                // message: "Please position!",
              },
            ]}
          >
            <Select
              options={[
                { value: "Project Manager", label: "Project Manager" },
                { value: "UX/UI", label: "UX/UI" },
                { value: "System Analynst", label: "System Analynst" },
                { value: "Software Developer", label: "Software Developer" },
                { value: "Tester", label: "Tester" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Please email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone_no"
            rules={[
              {
                required: true,
                message: "Please phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[
              {
                required: true,
                message: "Please startdate!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
