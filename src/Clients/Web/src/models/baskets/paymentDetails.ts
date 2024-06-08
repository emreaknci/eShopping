export interface PaymentDetails {
    cardNumber: string;
    cardHolderName: string;
    cardExpiration: Date;
    cardSecurityNumber: string;
    cardTypeId: number;
    numberOfInstallments: number;
}

export enum CardType{
    Amex = 1,
    Visa = 2,
    MasterCard = 3
}