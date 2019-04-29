import { Item } from "./item";

export class PartOfOrder {
    constructor(
        public id?: number,
      public amount?: number,
      public itemId?: number,
      public item?: Item
    ) { }
}
