import type { SiteContent } from "@/types";

// SEED DATA — mirrors the public copy of mobilemalldarbhanga.com.
// Every block below is served by GET /api/v1/site once the backend exists, and is editable from the admin.
export const seedSite: SiteContent = {
  settings: {
    storeName: "Mobile Mall Darbhanga",
    tagline: "The Home of Smartphones",
    description:
      "Darbhanga's complete mobile store — latest smartphones, accessories, exchange and EMI, all under one roof.",
    phoneDisplay: "+91 8271916118",
    phoneE164: "+918271916118",
    whatsappNumber: "918271916118",
    address: ["Bhagat Singh Chowk Tower", "Darbhanga, Bihar — 846004"],
    hours: "Open all 7 days · 10:00 AM – 9:00 PM",
    instagramHandle: "mobile_mall_darbhanga",
    mapQuery: "Bhagat Singh Chowk Tower, Darbhanga, Bihar 846004",
    topBarText: "Open all 7 days · 10 AM – 9 PM · Bhagat Singh Chowk Tower, Darbhanga",
    chatWelcome:
      "Namaste! Main Mobile Mall Darbhanga ka assistant hoon. Phones, brands, offers ya store timing ke baare mein poochiye.",
    chatEnabled: true,
  },
  banners: [
    {
      id: 1,
      href: "/phones",
      alt: "Flat discount price — best price guaranteed at Mobile Mall Darbhanga",
      image: "/images/banner-discount.webp",
      priority: true,
    },
    {
      id: 2,
      href: "/phones",
      alt: "Latest smartphones from Apple, Samsung, OnePlus, vivo and OPPO",
      image: "/images/banner-latest.webp",
    },
  ],
  tiles: [
    { id: 1, href: "/phones", alt: "Earbuds and headphones available at Mobile Mall", image: "/assets/tile-audio-DsRXcHdf.jpg" },
    { id: 2, href: "/phones", alt: "Smart watches available at Mobile Mall", image: "/assets/tile-watch-B2KbL5ty.jpg" },
    { id: 3, href: "/phones", alt: "Original chargers, cables and power banks", image: "/assets/tile-charger-DH16POHu.jpg" },
  ],
  categories: [
    { id: 1, label: "iPhone", icon: "smartphone", href: "/phones?brand=Apple" },
    { id: 2, label: "Samsung", icon: "smartphone", href: "/phones?brand=Samsung" },
    { id: 3, label: "vivo", icon: "smartphone", href: "/phones?brand=vivo" },
    { id: 4, label: "OPPO", icon: "smartphone", href: "/phones?brand=OPPO" },
    { id: 5, label: "OnePlus", icon: "smartphone", href: "/phones?brand=OnePlus" },
    { id: 6, label: "Watches", icon: "watch", href: "/phones" },
    { id: 7, label: "Audio", icon: "headphones", href: "/phones" },
    { id: 8, label: "Chargers", icon: "plug", href: "/phones" },
    { id: 9, label: "Power Banks", icon: "battery", href: "/phones" },
    { id: 10, label: "Covers", icon: "shield", href: "/phones" },
  ],
  services: [
    { id: 1, icon: "refresh", title: "Old Phone Exchange", text: "Instant valuation of your old handset, adjusted straight against your new phone." },
    { id: 2, icon: "badge", title: "Easy EMI & Finance", text: "Zero-cost EMI on cards and paperwork-light finance options with quick approval." },
    { id: 3, icon: "wrench", title: "Service & Setup", text: "Screen guard fitting, data transfer and after-sales support handled in store." },
    { id: 4, icon: "truck", title: "Home Delivery", text: "Free same-day delivery anywhere inside Darbhanga city on confirmed orders." },
  ],
  luckyDraw: {
    eyebrow: "Festive lucky draw",
    title: "Shop with us and win a scooter",
    summary:
      "Every purchase at Mobile Mall earns you a lucky draw entry. Call us for today's running offers, exchange bonus and accessory combos.",
    ctaLabel: "See the offer",
    steps: [
      "Shop any smartphone or accessory at Mobile Mall during the offer period.",
      "Collect your official lucky draw coupon with your eligible purchase.",
      "Watch the grand draw on Diwali — one lucky customer rides away with the scooter.",
    ],
    period: "15 September until Dhanteras. Winner announced in the grand draw on Diwali.",
    intro: "Every eligible purchase at Mobile Mall during the festive offer period gives you a chance to win a brand new petrol scooter.",
  },
  // Carried over from the current live site. Not yet confirmed as genuine/verified — flagged so the admin can moderate.
  reviews: [
    { id: 1, name: "Ankit Kumar", place: "Darbhanga", rating: 5, verified: false, text: "Got my iPhone here at a better price than online, and they set everything up for me before I left the shop." },
    { id: 2, name: "Priya Jha", place: "Laheriasarai", rating: 5, verified: false, text: "Exchanged my old Vivo for a new Samsung. Very fair value and the staff explained every option clearly." },
    { id: 3, name: "Md. Sahil", place: "Benta", rating: 5, verified: false, text: "Best collection of accessories in Darbhanga. Original chargers, good covers, and honest pricing." },
    { id: 4, name: "Rahul Mishra", place: "Madhubani", rating: 5, verified: false, text: "Travelled from Madhubani after a friend suggested them. Genuine sealed pack and quick billing." },
  ],
  brandBlurbs: [
    { name: "Apple", text: "iPhone models for everyday use, photography, and performance, along with cases, chargers, and audio." },
    { name: "Samsung", text: "Galaxy smartphones across budgets, from everyday devices to flagship cameras and displays." },
    { name: "Vivo", text: "Camera-focused smartphones with sleek design and fast charging." },
    { name: "OPPO", text: "Stylish devices with strong battery life and photography features." },
    { name: "OnePlus", text: "Fast, smooth performance phones for gaming and heavy daily use." },
    { name: "And more", text: "Accessories, protection, audio, and exchange offers on your old phone. Visit us at Bhagat Singh Chowk Tower, Darbhanga, or call 8271916118 to check availability." },
  ],
  pages: {
    phones: {
      slug: "phones",
      title: "Smartphone Catalog",
      subtitle: "Prices change daily — tap Get Price and we will tell you today's best offer.",
      seoTitle: "Smartphone Catalog — Mobile Mall Darbhanga | Call for Price",
      seoDescription:
        "Browse smartphones from Apple, Samsung, vivo, OPPO, OnePlus, Redmi, realme, iQOO and more at Mobile Mall Darbhanga. Call 8271916118 for the latest price.",
      sections: [],
    },
    brands: {
      slug: "brands",
      title: "Brands at Mobile Mall",
      subtitle: "All your favourite brands. One grand destination.",
      seoTitle: "Smartphone Brands in Darbhanga — Apple, Samsung, Vivo, OPPO, OnePlus",
      seoDescription: "Shop Apple, Samsung, Vivo, OPPO, OnePlus and more smartphones at Mobile Mall Darbhanga, with accessories and exchange offers. Call 8271916118.",
      sections: [],
    },
    "lucky-draw": {
      slug: "lucky-draw",
      title: "Festive Lucky Draw",
      subtitle: "Shop. Celebrate. Ride home a winner.",
      seoTitle: "Festive Lucky Draw — Win a Scooter at Mobile Mall Darbhanga",
      seoDescription: "Shop at Mobile Mall Darbhanga during the festive offer period, collect your lucky draw coupon, and win a brand new petrol scooter in the Diwali draw.",
      sections: [],
    },
    about: {
      slug: "about",
      title: "About Mobile Mall",
      subtitle: "The Home of Smartphones.",
      seoTitle: "About Mobile Mall Darbhanga — The Home of Smartphones",
      seoDescription: "Mobile Mall Darbhanga brings Apple, Samsung, Vivo, OPPO, OnePlus and more smartphones together in one store at Bhagat Singh Chowk Tower, Darbhanga.",
      sections: [
        {
          body: [
            "At Mobile Mall, technology comes together in one place.",
            "Explore the latest smartphones from the brands that shape the way we connect, work, create, and experience the world.",
            "From Apple and Samsung to Vivo, OPPO, OnePlus, and more, Mobile Mall brings a wide choice of mobile technology to Darbhanga.",
          ],
        },
        {
          heading: "Designed around choice.",
          body: [
            "Every smartphone is different. So is every person who uses one.",
            "Whether you’re looking for something powerful, beautifully designed, built for creativity, or made for everyday life, finding the right device should feel simple.",
            "That’s what Mobile Mall is built for.",
          ],
        },
        {
          heading: "Leading brands. Latest technology. One destination.",
          body: ["MOBILE MALL", "Bhagat Singh Chowk Tower, Darbhanga — 846004", "The Home of Smartphones. 📲"],
        },
      ],
    },
    contact: {
      slug: "contact",
      title: "Contact Mobile Mall",
      subtitle: "Call, WhatsApp or visit — or send us a message below.",
      seoTitle: "Contact Mobile Mall Darbhanga — Call, WhatsApp or Visit",
      seoDescription: "Contact Mobile Mall Darbhanga at Bhagat Singh Chowk Tower. Call +91 8271916118, WhatsApp us or visit the store.",
      sections: [],
    },
  },
};
