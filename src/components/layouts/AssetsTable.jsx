import { Table } from "antd";
import { useCrypto } from "../../context/crypto-context";

const columns = [
  {
    title: "Asset",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Current Price",
    dataIndex: "current",
    defaultSortOrder: "descend",
  },
  {
    title: "Buy Price",
    dataIndex: "price",
    defaultSortOrder: "descend",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },

  {
    title: "Current Profit",
    dataIndex: "profit",
  },
  {
    title: "Total Invested",
    dataIndex: "invested",
    sorter: (a, b) => a.amount * a.price - b.amount * b.price,
  },
  {
    title: "Holdings",
    dataIndex: "holdings",
  },
];

export default function AssetsTable() {
  const { assets, crypto } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    current: crypto
      .find((c) => {
        if (c.id === a.id) return c.price;
      })
      .price.toFixed(2),
    price: a.price,
    amount: a.amount.toFixed(2),
    invested: (a.amount * a.price).toFixed(2),
    profit: a.totalProfit.toFixed(2),
    holdings: (
      crypto.find((c) => {
        if (c.id === a.id) return c.price;
      }).price * a.amount
    ).toFixed(2),
  }));

  if (assets.length !== 0) {
    return (
      <Table
        style={{ fontWeight: 700, marginTop: "1rem" }}
        pagination={false}
        columns={columns}
        dataSource={data}
        bordered={true}
      />
    );
  } else return <div style={{ fontSize: 28 }}>No Table of Assets</div>;
}
