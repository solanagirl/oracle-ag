import { PriceFeed } from "@pythnetwork/price-service-client";
import PriceCell from "./PriceCell";

type PythPriceCellProps = {
    price: PriceFeed,
    ema: boolean,
    refresh: () => void
}

export default function PythPriceCell({ price, ema, refresh }: PythPriceCellProps) {
    if (ema) {
        const priceInfo = price.getEmaPriceUnchecked();
        const time = new Date(priceInfo.publishTime * 1000).toLocaleTimeString();
        return (
            <div>
                <PriceCell id={price.id} price={(Number(priceInfo.price) * (10 ** priceInfo.expo)).toFixed(6)} published={time} refresh={refresh} />
            </div>
        )
    } else {
        const priceInfo = price.getPriceUnchecked();
        const time = new Date(priceInfo.publishTime * 1000).toLocaleTimeString();
        return (
            <div>
                <PriceCell id={price.id} price={(Number(priceInfo.price) * (10 ** priceInfo.expo)).toFixed(6)} published={time} refresh={refresh} />
            </div>
        )
    }
}