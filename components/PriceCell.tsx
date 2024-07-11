import { PriceFeed } from "@pythnetwork/price-service-client";
import { useState } from "react";
import priceFeeds from '../src/priceFeeds.json';
import Image from "next/image";

type PriceTableProps = {
    id: string,
    price: string,
    published: string,
    refresh: () => void
}

export default function PriceCell({ id, price, published, refresh }: PriceTableProps) {
    const [flipped, setFlipped] = useState(false);
    const feedInfo = priceFeeds.data.find((feed) => feed.id === id);

    if (!feedInfo) {
        return (
            <div className="bg-black text-white px-6 max-w-64 min-w-64 min-h-20 flex flex-col justify-center items-center cursor-pointer" onClick={() => { setFlipped(!flipped); refresh() }}>
                <div className="text-sm">Pair Address: {id.slice(0, 3)}...{id.slice(-3)}</div>
                <div className="text-sm">Last Updated At: {published}</div>
            </div>
        )
    }
    if (flipped) {
        return (
            <div>
                <div>{feedInfo.name}</div>
                <div className="bg-black text-white px-6 max-w-64 min-w-64 min-h-20 flex flex-row gap-4 justify-center items-center cursor-pointer" onClick={() => { setFlipped(!flipped); refresh() }}>
                    <div className="flex flex-col justify-center items-start">
                        <div className="text-xs">Pair Address: {id.slice(0, 3)}...{id.slice(-3)}</div>
                        <div className="text-xs">Last Updated At: {published}</div>
                    </div>
                    <a href={`https://jup.ag/swap/${feedInfo.name.replace('/', '-')}C`}>
                        <Image src='/jupiter-logo.svg' width={25} height={25} alt='Jupiter Exchange' className="right-0 top-0" />
                    </a>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div>{feedInfo.name}</div>
                <div className="bg-black text-white px-6 max-w-64 min-w-64 min-h-20 flex justify-center items-center cursor-pointer" onClick={() => { setFlipped(!flipped); refresh() }}>
                    <div className="text-2xl">{price}</div>
                </div>
            </div>
        )
    }
}