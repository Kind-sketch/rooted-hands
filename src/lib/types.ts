export type Product = {
  id: string;
  name: string;
  artisan: Artisan;
  price: number;
  image: {
    url: string;
    hint: string;
  };
  category: string;
  likes: number;
  sales: number;
};

export type Artisan = {
  id: string;
  name: string;
  avatar: {
    url: string;
    hint: string;
  };
  crafts?: string[];
};

export type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
};

export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

export type SponsorRequest = {
    id: string;
    name: string;
    avatarUrl: string;
    contributionAmount: number;
    message: string;
}

export type SavedCollection = {
    id: string;
    name: string;
    productIds: string[];
}
