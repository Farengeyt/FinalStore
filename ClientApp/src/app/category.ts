import { Item } from "./item";

export class Category {
    constructor(
        public id?: number,
        public name?: string,
        public items?: Item[]) { }
}