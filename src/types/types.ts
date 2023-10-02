export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: string;
    image: string;
    quantity?: number;
}

export interface CartProduct extends Product {
    quantity: number;
}
