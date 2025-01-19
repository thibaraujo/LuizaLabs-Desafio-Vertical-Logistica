import { IOrder } from "../commons/interfaces/order";

export function transformStringToOrderJSON(line: string): IOrder {
    // const userId = line.slice(0, 10).trim();

    const fields = {
        userId: { start: 0, length: 10 },
        userName: { start: 10, length: 45 },
        orderId: { start: 55, length: 10 },
        productId: { start: 65, length: 10 },
        value: { start: 75, length: 12 },
        date: { start: 87, length: 8 },
    };

    const extractField = ({ start, length }: { start: number; length: number }): string =>
        line.slice(start, start + length).trim();

    return {
        user_id: parseInt(extractField(fields.userId)),
        name: extractField(fields.userName),
        order_id: parseInt(extractField(fields.orderId)),
        product: {
            product_id: parseInt(extractField(fields.productId)),
            value: parseFloat(extractField(fields.value)),
        },
        date: extractField(fields.date),
    };
}