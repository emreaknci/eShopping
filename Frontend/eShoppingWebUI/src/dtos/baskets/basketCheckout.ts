import { Address } from "../../models/baskets/address";
import { PaymentDetails } from "../../models/baskets/paymentDetails";

export interface BasketCheckout {
    shippingAddress: Address;
    paymentDetails: PaymentDetails;
    buyer: string; // userId
}