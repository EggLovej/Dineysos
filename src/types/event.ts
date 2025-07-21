export interface Event {
    _id: string;
    name: string;
    subtitle: {
      de: string;
      en: string;
    };
    slug: {
      current: string;
    }
    startDate: string;
    endDate: string;
    locationDetails: {
      city: string;
      street: string;
      zip: string;
      name: string;
    };
    priceInfo: {
      price: number;
      specialPrice: boolean;
      oldPrice: number;
    };
    coverImageUrl: string;
    logoUrl: string;
    descriptionParagraphs: {
      de: string[];
      en: string[];
    };
  }