import { Category } from "./category";

export class Item {
    constructor(
        public id?: number,
        public company?: string,
        public model?: string,
        public price?: number,
      public description?: string,
      public category?: Category, ) { }
}
