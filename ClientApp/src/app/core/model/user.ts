import { Practitioner } from './practitioner';

export interface User {
    Id: number;
    Name: string;
    Email: string;
    Role: string;
    PhoneNumber: string;
    Practitioner: Practitioner;
    ConfirmedDate?: Date;
    RequiresPayment?: boolean;
    PaymentId?: string;
  LastSignInDate?: Date;
  IsImpersonating: boolean;
}
