import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
import CryptoCurrency from "./CryptoCurrency";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 80,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#27272A",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: "23.5%" }}
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        value="press / Avalible Crypto Currency"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "20px" }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <CryptoCurrency />
      <Button
        type="primary"
        onClick={() => setDrawer(true)}
        style={{ width: "20%", fontWeight: "bold" }}
      >
        Add Asset
      </Button>
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={500}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose={true}
        style={{ background: "#DCDCDC" }}
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
