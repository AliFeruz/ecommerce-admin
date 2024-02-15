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
    properties?: Property[]
  }

  export type Property = {
    _id?: number;
    name: string;
    values: string[];
  }

  export type OrderType = {
    _id: number;
    line_items: object[];
    name: string;
    email: string;
    city: string;
    country: string;
    cityCode: string;
    address: string;
    paid: boolean;
    createdAt: string;
    updatedAt: string;
  }