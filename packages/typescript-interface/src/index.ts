
type LoginInputProps = {
    email: string;
    password: string;
 }

 type SginUpFormProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    state: string;
    dob: string;
 };
 
 type AddCardFormProps = {
    cardNumber: string;
    cardHolder: string;
    phone: string;
    month: string;
    year: string;
    cvv: string;
 };

export type { LoginInputProps, SginUpFormProps, AddCardFormProps };