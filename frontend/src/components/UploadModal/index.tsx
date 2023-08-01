import { Form, Input, Modal, Upload, UploadProps, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import UploadIcon from "../../assets/uploadicon.png";
import type { UploadFile } from "antd/es/upload/interface";
import React from "react";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const UploadModal = ({ isModalOpen, handleCancel, handleOk }: Props) => {
  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const fileList: UploadFile[] = [
    {
      uid: "0",
      name: "xxx.png",
      status: "uploading",
      percent: 33,
    },
  ];
  return (
    <Modal
      title="Utilize our Analysis Algorithm
        Create your book in seconds"
      closeIcon={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="url"
          label="Story Name"
          rules={[
            { type: "url", warningOnly: true },
            { type: "string", min: 6 },
          ]}
        >
          <Input placeholder="input your story name" />
        </Form.Item>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <img src={UploadIcon} alt="uploadicon" />
          </p>
          <p className="ant-upload-text">Drag and Drop, or Browse</p>
          <p className="ant-upload-hint">
            Text files only (.rtf, .txt, .docx, .doc, .wpd)
          </p>
        </Dragger>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          defaultFileList={[...fileList]}
        ></Upload>
      </Form>
    </Modal>
  );
};

export default UploadModal;
