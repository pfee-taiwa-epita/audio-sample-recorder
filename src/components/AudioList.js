import React from "react";

import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function AudioList({ records, label, deleteRecord }) {
  const dataSource = records.filter((row) => row.tree_label === label);

  const columns = [
    {
      title: "Nom du fichier",
      dataIndex: "file_name",
      key: "file_name",
      width: "10%",
    },
    {
      title: "Audio",
      dataIndex: "audioUrl",
      key: "audioUrl",
      width: "60%",
      render: (text) => <audio controls src={text} />,
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Button onClick={() => deleteRecord(record.id)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}


