import Cart from "./Cart";

export default interface Order {
    products?: Cart[];
    totalPrice?: number;
}

export default interface ShippingInfo {
    _id?: string;
    userId?: string;
    name: {
        firstName?: string;
        middleName?: string;
        lastName?: string;
    };
    phone?: string;
    email: string;
    address: {
        country?: string;
        state?: string;
        city?: string;
        street?: string;
        houseNumber?: string;
        floor?: number;
        apartment?: number;
        zipcode?: string;
    };
    deliveryComments: string;
    active?: boolean;
}
