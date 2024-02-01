export type Product = {
    _id: number;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    images: Array<string>;
    category?: string;
    properties?: object
  }

  export type Category = {
    _id: number;
    name: string;
    parent?: {
      _id: number | string;
      name: string;
    };
    properties?: object;
  }

  export type Property = {
    _id?: number;
    name: string;
    values: string[];
  }