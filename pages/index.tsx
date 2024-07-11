import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { PriceFeed, PriceServiceConnection } from "@pythnetwork/price-service-client";
import getPythPrice from "@/src/getPythPrice";
import PythPriceCell from "@/components/PythPriceCell";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [priceFeed, setPriceFeed] = useState<PriceFeed[]>();
  const [refresh, setRefresh] = useState(false);

  const priceIds = [
    "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
    "67be9f519b95cf24338801051f9a808eff0a578ccb388db73b7f6fe1de019ffb",
    'ab7347771135fc733f8f38db462ba085ed3309955f42554a14fa13e855ac0e2f'

  ];

  useEffect(() => {
    async function getPrice() {
      const currentPrices = await getPythPrice(priceIds);
      console.log(JSON.stringify(currentPrices));
      setPriceFeed(currentPrices);
    }

    getPrice();
  }, [refresh]);



  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      {
        priceFeed?.map((price) => (
          <PythPriceCell price={price} ema={false} refresh={() => { setRefresh(!refresh) }} />
        ))
      }
    </main>
  );
}
