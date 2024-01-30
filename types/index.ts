export type Product = {
    _id: number;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    images: Array<string>
  }

  export type Category = {
    _id: number;
    name: string
  }