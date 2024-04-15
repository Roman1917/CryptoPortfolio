import { Layout, Typography } from "antd";
import { DollarTwoTone } from "@ant-design/icons";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  background: "#27272A",
  padding: "2rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      {assets.length !== 0 ? (
        <Typography.Title
          level={2}
          style={{ textAlign: "left", color: "white" }}
        >
          <DollarTwoTone spin={false} />
          <span> Balance: $</span>
          {assets
            .map((asset) => asset.amount * cryptoPriceMap[asset.id])
            .reduce((acc, value) => acc + value, 0)
            .toFixed(2)}
        </Typography.Title>
      ) : (
        <div style={{ fontSize: 28 }}>No Active Balance</div>
      )}
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
