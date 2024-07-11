import { PriceServiceConnection } from "@pythnetwork/price-service-client";

export default async function getPythPrice(priceIds: string[]) {
    const connection = new PriceServiceConnection("https://hermes.pyth.network");

    const currentPrices = await connection.getLatestPriceFeeds(priceIds);

    if (!currentPrices) {
        console.log(currentPrices)
        throw new Error("Failed to get current prices");
    }
    return currentPrices;
}