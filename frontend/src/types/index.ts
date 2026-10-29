export type Brand = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  /** Path or absolute URL. Relative paths resolve against NEXT_PUBLIC_MEDIA_BASE_URL. */
  image: string;
  /** Selling price in INR (whole rupees). null => "Call for today's price". */
  price: number | null;
  originalPrice?: number | null;
  featured: boolean;
  bestPrice: boolean;
  published: boolean;
};

export type BannerSlide = {
  id: number;
  href: string;
  alt: string;
  image: string;
  priority?: boolean;
};

export type CategoryShortcut = { id: number; label: string; icon: string; href: string };
export type ServiceItem = { id: number; title: string; text: string; icon: string };

export type Review = {
  id: number;
  name: string;
  place: string;
  rating: number;
  text: string;
  verified: boolean;
};

export type LuckyDraw = {
  eyebrow: string;
  title: string;
  summary: string;
  ctaLabel: string;
  steps: string[];
  period: string;
  intro: string;
};

export type SiteSettings = {
  storeName: string;
  tagline: string;
  description: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  address: string[];
  hours: string;
  instagramHandle: string;
  mapQuery: string;
  topBarText: string;
  chatWelcome: string;
  chatEnabled: boolean;
};

export type PageCopy = {
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  sections: { heading?: string; body: string[] }[];
};

export type SiteContent = {
  settings: SiteSettings;
  banners: BannerSlide[];
  tiles: BannerSlide[];
  categories: CategoryShortcut[];
  services: ServiceItem[];
  luckyDraw: LuckyDraw;
  reviews: Review[];
  pages: Record<string, PageCopy>;
  brandBlurbs: { name: string; text: string }[];
};

export type ChatReply = { reply: string; sessionId?: string; handoffUrl?: string };

export type ProductSpec = { group: string; label: string; value: string };
export type ProductImage = { url: string; alt?: string | null };
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "unknown";
export type ProductVariant = {
  id: number;
  sku: string;
  ram: string | null;
  storage: string | null;
  color: string | null;
  price: number | null;
  stockStatus: StockStatus;
};

/** Specs/variants/warranty are empty until the admin fills them in. Nothing here is invented. */
export type ProductDetail = Product & {
  modelNumber: string | null;
  description: string | null;
  warranty: string | null;
  images: ProductImage[];
  specs: ProductSpec[];
  variants: ProductVariant[];
  related: Product[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type OrderStatus = "pending_confirmation" | "confirmed" | "processing" | "ready" | "shipped" | "completed" | "cancelled";
export type DeliveryMethod = "pickup" | "home_delivery";

export type OrderRequest = {
  idempotencyKey: string;
  name: string;
  phone: string;
  email: string;
  deliveryMethod: DeliveryMethod;
  address: string;
  note: string;
  consent: boolean;
  items: { slug: string; qty: number }[]; // prices are never sent: the backend looks them up
};

export type OrderCreated = { reference: string; status: OrderStatus };

export type OrderTrack = {
  reference: string;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  items: { name: string; qty: number }[];
  timeline: { status: OrderStatus; at: string; note?: string | null }[];
};
