import { useEffect, useState, createContext, useContext } from "react";
import { fakeFetchCrypto } from "../api";
import { percentDifference } from "../utils.js";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});
export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const result = await fakeFetchCrypto();
      const assets = [];
      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
    }

    preload();
  }, []);
  function updateAsset(newAsset) {
    const updatedArray = assets.map((a) => {
      const coin = crypto.find((c) => c.id === a.id);
      if (a.id === newAsset.id) {
        return {
          ...a,
          price: (
            (a.price * a.amount + newAsset.price * newAsset.amount) /
            (a.amount + newAsset.amount)
          ).toFixed(2),
          amount: a.amount + newAsset.amount,
          totalAmount: (a.amount + newAsset.amount) * coin.price,
          totalProfit: coin.price * a.amount - a.amount * a.price,
        };
      } else return a;
    });
    setAssets(updatedArray);
  }

  function addAsset(newAsset) {
    if (assets.find((a) => a.id === newAsset.id)) updateAsset(newAsset);
    else setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider
      value={{ loading, crypto, assets, addAsset, setAssets }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
