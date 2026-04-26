export interface Profile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: number | null;
  role: string | null;
  status: string | null;
  providerProfile?: {
    id: string;
    shopName: string;
    address: string;
    phone: string;
    image: string;
  } | null;
}
