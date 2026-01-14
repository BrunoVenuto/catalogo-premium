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
    name: "Whay Protein 900g",
    price: 199,
    image: "/images/whay.png",
    category: "Linha Gold",
    description: "Descrição completa do Produto Alpha.",
  },
  {
    id: 2,
    name: "Creatina Integral",
    price: 299,
    image: "/images/creatina.png",
    category: "Linha Integral",
    description: "Descrição completa do Produto Beta.",
  },
  {
    id: 3,
    name: "Maltodextrina",
    price: 399,
    image: "/images/maltodextrina.png",
    category: "Linha Premium",
    description: "Descrição completa do Produto Gama.",
  },
  {
    id: 4,
    name: "Whay Protein 900g",
    price: 199,
    image: "/images/whay.png",
    category: "Linha Gold",
    description: "Descrição completa do Produto Alpha.",
  },
  {
    id: 5,
    name: "Creatina Integral",
    price: 299,
    image: "/images/creatina.png",
    category: "Linha Integral",
    description: "Descrição completa do Produto Beta.",
  },
  {
    id: 6,
    name: "Maltodextrina Morango",
    price: 399,
    image: "/images/maltodextrina.png",
    category: "Linha Premium",
    description: "Descrição completa do Produto Gama.",
  }
  
];
