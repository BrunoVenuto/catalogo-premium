export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Trembolona",
    price: 199,
    image: "/images/trembolona.jpg",
    category: "Linha Landerlan",
    description: "Descrição completa do Produto Alpha.",
  },
  {
    id: 2,
    name: "Produto Beta",
    price: 299,
    image: "/images/trembolona.jpg",
    category: "Linha Cooper",
    description: "Descrição completa do Produto Beta.",
  },
  {
    id: 3,
    name: "Produto Gama",
    price: 399,
    image: "/images/trembolona.jpg",
    category: "Linha Premium",
    description: "Descrição completa do Produto Gama.",
  },
  {
    id: 4,
    name: "Trembolona",
    price: 199,
    image: "/images/trembolona.jpg",
    category: "Linha Landerlan",
    description: "Descrição completa do Produto Alpha.",
  },
  {
    id: 5,
    name: "Produto Beta",
    price: 299,
    image: "/images/trembolona.jpg",
    category: "Linha Cooper",
    description: "Descrição completa do Produto Beta.",
  },
  {
    id: 6,
    name: "Produto Gama",
    price: 399,
    image: "/images/trembolona.jpg",
    category: "Linha Premium",
    description: "Descrição completa do Produto Gama.",
  },
  
];
