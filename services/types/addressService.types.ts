export type CreateAddressBody = {
  address: string;
  street: string;
  city: string;
  zipCode: string;
  province: string;
  plate: string;
  floor?: string | undefined;
  receiverName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  isDefault: boolean;
};
