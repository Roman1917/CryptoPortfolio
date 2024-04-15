import { useCrypto } from "../../context/crypto-context";
import { useMemo } from "react";

export default function CryptoCurrency() {
  const { crypto } = useCrypto();

  const currency = useMemo(() => {
    return crypto.filter((item) =>
      ["BTC", "ETH", "BNB", "DOT", "ATOM"].includes(item.symbol)
    );
  }, [crypto]);

  return (
    <div
      style={{
        width: "53%",

        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        overflow: "hidden",
      }}
    >
      {currency.map((crypto) => (
        <div key={crypto.id}>
          {crypto.symbol}: {crypto.price.toFixed(2)}${" "}
          <span
            style={{ color: crypto.priceChange1d > 0 ? "green" : "#F0383F" }}
          >
            {" "}
            {crypto.priceChange1d}%
          </span>
        </div>
      ))}
    </div>
  );
}
