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
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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

  //delete
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  useEffect(() => {
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
      render: (_, record) =>
        dayjs(record.start_date).tz("Asia/Bangkok").format("YYYY-MM-DD"),
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
          <Button onClick={() => showDeleteModal(record.id)}>Delete</Button>
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
      fetchData();
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  //edit
  const ShowEditModal = (record) => {
    setSelectEmp(record);
    form.setFieldsValue({
      ...record,
      start_date: record.start_date ? dayjs(record.start_date) : null,
    });
    setOpenEdit(true);
  };

  const CloseEdit = () => {
    form.resetFields();
    setSelectEmp(null);
    setOpenEdit(false);
  };

  const handleEdit = async (values) => {
    if (!selectEmp) return;

    try {
      const response = await axios.patch(
        `https://organize-dev.allkons.com/org-center-sv/api/test-frontend/${selectEmp.id}`,
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Edit Response:", response.data);

      // ปิด Modal และรีเฟรชข้อมูล
      CloseEdit();
      form.resetFields();
      setSelectEmp(null);
      fetchData(); // โหลดข้อมูลใหม่
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  //delete
  const showDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleDeleteCancel = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(
        `https://organize-dev.allkons.com/org-center-sv/api/test-frontend/${deleteId}`
      );
      fetchData();
      setOpenDelete(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting data:", error.response?.data || error);
    }
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

      {/* Modal Delete */}
      <Modal
        open={openDelete}
        title="Are you sure?"
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            No
          </Button>,
          <Button key="confirm" type="primary" onClick={handleDeleteConfirm}>
            Yes
          </Button>,
        ]}
      >
        <p>Do you want to delete this employee?</p>
      </Modal>
    </>
  );
}
