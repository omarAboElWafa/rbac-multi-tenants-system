export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export interface IProductInputDTO {
  name: string;
  description: string;
  price: number;
}
