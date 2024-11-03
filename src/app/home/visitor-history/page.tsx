"use client";

import { Visitor } from "@prisma/client";
import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import getColor from "../../hooks/useColor";

const { Title, Text } = Typography;

const columns = [
  {
    title: "No",
    dataIndex: "index",
    key: "index",
    render: (text: number) => text + 1,
  },
  {
    title: "Metadata",
    dataIndex: "metadata",
    key: "metadata",
    render: (text: string) => (
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {text}
      </pre>
    ),
  },
];

const VisitorHistoryPage = () => {
  const { textColor } = getColor();
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const fetchVisitors = async () => {
    try {
      const res = await fetch(`${process.env.BASE_API_URL}/last-visitors`, {
        method: "GET",
      });
      const result = await res.json();
      if (result?.payload?.results) {
        const visitorData = result.payload.results.map(
          (visitor: Visitor, index: number) => ({
            key: visitor.id,
            metadata: JSON.stringify(visitor.metadata),
            index,
          })
        );
        setVisitors(visitorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: 40 }}>
      <Title style={{ color: textColor }}>Visitor History</Title>
      <Text style={{ color: textColor }}>Last 24 Hour Visitor Data</Text>
      <Table
        dataSource={visitors}
        columns={columns}
        rowKey="key"
        pagination={false}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default VisitorHistoryPage;
