import { PartOfOrder } from "./part-of-order";

export class Order {
    constructor(
        public id?: number,
        public telephoneNumber?: string,
        public address?: string,
        public partOfOrders?: PartOfOrder[]) { }
}
