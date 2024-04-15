import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { capitalize } from "../../utils.js";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context.jsx";

const siderStyle = {
  padding: "1rem",
  background: "#27272A",
};

export default function AppSider() {
  const { assets, setAssets } = useContext(CryptoContext);
  if (assets.length !== 0) {
    return (
      <Layout.Sider width="25%" style={siderStyle}>
        {assets.map((asset) => (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              style={{ fontWeight: "bold" }}
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />

            <List
              size="small"
              dataSource={[
                {
                  tittle: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { tittle: "Asset Amount", value: asset.amount, isPlain: true },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.tittle}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
            <div
              onClick={() => {
                setAssets(assets.filter((item) => item.id !== asset.id));
              }}
              style={{
                display: "flex",
                justifyContent: "right",
                fontWeight: 500,
              }}
            >
              <DeleteFilled />
              <span className="delete"> Delete</span>
            </div>
          </Card>
        ))}
      </Layout.Sider>
    );
  } else
    return (
      <div
        style={{
          padding: "1rem",
          background: "#27272A",
          fontSize: 28,
          color: "white",
        }}
      >
        No Assets
      </div>
    );
}
