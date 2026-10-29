import type { Brand, Product } from "@/types";

// SEED DATA — mirrors the public catalogue of mobilemalldarbhanga.com.
// Prices are intentionally null (the store quotes prices by phone). Replace via the admin/API once the backend is live.
export const seedBrands: Brand[] = [
  {
    "id": 1,
    "name": "Apple",
    "slug": "apple"
  },
  {
    "id": 2,
    "name": "Google",
    "slug": "google"
  },
  {
    "id": 3,
    "name": "HMD",
    "slug": "hmd"
  },
  {
    "id": 4,
    "name": "HONOR",
    "slug": "honor"
  },
  {
    "id": 5,
    "name": "Infinix",
    "slug": "infinix"
  },
  {
    "id": 6,
    "name": "iQOO",
    "slug": "iqoo"
  },
  {
    "id": 7,
    "name": "itel",
    "slug": "itel"
  },
  {
    "id": 8,
    "name": "Lava",
    "slug": "lava"
  },
  {
    "id": 9,
    "name": "Motorola",
    "slug": "motorola"
  },
  {
    "id": 10,
    "name": "Nokia",
    "slug": "nokia"
  },
  {
    "id": 11,
    "name": "Nothing",
    "slug": "nothing"
  },
  {
    "id": 12,
    "name": "OnePlus",
    "slug": "oneplus"
  },
  {
    "id": 13,
    "name": "OPPO",
    "slug": "oppo"
  },
  {
    "id": 14,
    "name": "POCO",
    "slug": "poco"
  },
  {
    "id": 15,
    "name": "realme",
    "slug": "realme"
  },
  {
    "id": 16,
    "name": "Redmi",
    "slug": "redmi"
  },
  {
    "id": 17,
    "name": "Samsung",
    "slug": "samsung"
  },
  {
    "id": 18,
    "name": "TECNO",
    "slug": "tecno"
  },
  {
    "id": 19,
    "name": "vivo",
    "slug": "vivo"
  },
  {
    "id": 20,
    "name": "Xiaomi",
    "slug": "xiaomi"
  }
];

export const featuredOrder: string[] = ["iphone-18-pro", "iphone-16", "iphone-16-plus", "google-pixel-11", "iqoo-15-5g", "iphone-17e", "google-pixel-11-pro", "nothing-phone-4b", "motorola-edge-70-max", "iqoo-z11-5g"];

export const seedProducts: Product[] = [
  {
    "id": 1,
    "slug": "iphone-18-pro",
    "name": "iPhone 18 Pro",
    "brand": "Apple",
    "image": "/phones/iphone-18-pro.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 2,
    "slug": "iphone-duo",
    "name": "iPhone Duo",
    "brand": "Apple",
    "image": "/phones/iphone-duo.jpg",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 3,
    "slug": "iphone-16",
    "name": "iPhone 16",
    "brand": "Apple",
    "image": "/phones/iphone-16.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 4,
    "slug": "iphone-16-plus",
    "name": "iPhone 16 Plus",
    "brand": "Apple",
    "image": "/phones/iphone-16-plus.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 5,
    "slug": "iphone-16e",
    "name": "iPhone 16e",
    "brand": "Apple",
    "image": "/phones/iphone-16e.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 6,
    "slug": "iphone-17e",
    "name": "iPhone 17e",
    "brand": "Apple",
    "image": "/phones/iphone-17e.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 7,
    "slug": "google-pixel-10-pro-fold",
    "name": "Google Pixel 10 Pro Fold",
    "brand": "Google",
    "image": "/phones/google-pixel-10-pro-fold.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 8,
    "slug": "google-pixel-10a",
    "name": "Google Pixel 10a",
    "brand": "Google",
    "image": "/phones/google-pixel-10a.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 9,
    "slug": "google-pixel-11",
    "name": "Google Pixel 11",
    "brand": "Google",
    "image": "/phones/google-pixel-11.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 10,
    "slug": "google-pixel-11-pro",
    "name": "Google Pixel 11 Pro",
    "brand": "Google",
    "image": "/phones/google-pixel-11-pro.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 11,
    "slug": "hmd-vibe-2-5g",
    "name": "HMD Vibe 2 5G",
    "brand": "HMD",
    "image": "/phones/hmd-vibe-2-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 12,
    "slug": "hmd-vibe-5g",
    "name": "HMD Vibe 5G",
    "brand": "HMD",
    "image": "/phones/hmd-vibe-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 13,
    "slug": "honor-x9b",
    "name": "HONOR X9B",
    "brand": "HONOR",
    "image": "/phones/honor-x9b.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 14,
    "slug": "infinix-hot-20-5g",
    "name": "Infinix Hot 20 5G",
    "brand": "Infinix",
    "image": "/phones/infinix-hot-20-5g.png",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 15,
    "slug": "infinix-hot-60i",
    "name": "Infinix Hot 60i",
    "brand": "Infinix",
    "image": "/phones/infinix-hot-60i.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 16,
    "slug": "infinix-smart-10",
    "name": "Infinix Smart 10",
    "brand": "Infinix",
    "image": "/phones/infinix-smart-10.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 17,
    "slug": "infinix-smart-9-hd",
    "name": "Infinix Smart 9 Hd",
    "brand": "Infinix",
    "image": "/phones/infinix-smart-9-hd.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 18,
    "slug": "iqoo-15-5g",
    "name": "iQOO 15 5G",
    "brand": "iQOO",
    "image": "/phones/iqoo-15-5g.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 19,
    "slug": "iqoo-15r-5g",
    "name": "iQOO 15r 5G",
    "brand": "iQOO",
    "image": "/phones/iqoo-15r-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 20,
    "slug": "iqoo-z11-5g",
    "name": "iQOO Z11 5G",
    "brand": "iQOO",
    "image": "/phones/iqoo-z11-5g.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 21,
    "slug": "iqoo-z11x-5g",
    "name": "iQOO Z11X 5G",
    "brand": "iQOO",
    "image": "/phones/iqoo-z11x-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 22,
    "slug": "itel-p55-5g",
    "name": "Itel P55 5G",
    "brand": "itel",
    "image": "/phones/itel-p55-5g.jpg",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 23,
    "slug": "lava-yuva-2",
    "name": "Lava Yuva 2",
    "brand": "Lava",
    "image": "/phones/lava-yuva-2.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 24,
    "slug": "lava-yuva-2-pro",
    "name": "Lava Yuva 2 Pro",
    "brand": "Lava",
    "image": "/phones/lava-yuva-2-pro.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 25,
    "slug": "moto-g-max",
    "name": "Moto G Max",
    "brand": "Motorola",
    "image": "/phones/moto-g-max.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 26,
    "slug": "moto-g37-power",
    "name": "Moto G37 Power",
    "brand": "Motorola",
    "image": "/phones/moto-g37-power.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 27,
    "slug": "moto-g77-power-5g",
    "name": "Moto G77 Power 5G",
    "brand": "Motorola",
    "image": "/phones/moto-g77-power-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 28,
    "slug": "motorola-edge-70-max",
    "name": "Motorola Edge 70 Max",
    "brand": "Motorola",
    "image": "/phones/motorola-edge-70-max.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 29,
    "slug": "nokia-235-4g-2024",
    "name": "Nokia 235 4G (2024)",
    "brand": "Nokia",
    "image": "/phones/nokia-235-4g-2024.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 30,
    "slug": "nokia-3210",
    "name": "Nokia 3210",
    "brand": "Nokia",
    "image": "/phones/nokia-3210.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 31,
    "slug": "nokia-5310-2024",
    "name": "Nokia 5310 (2024)",
    "brand": "Nokia",
    "image": "/phones/nokia-5310-2024.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 32,
    "slug": "nokia-6310-2024",
    "name": "Nokia 6310 (2024)",
    "brand": "Nokia",
    "image": "/phones/nokia-6310-2024.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 33,
    "slug": "nothing-cmf-1",
    "name": "Nothing CMF 1",
    "brand": "Nothing",
    "image": "/phones/nothing-cmf-1.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 34,
    "slug": "nothing-phone-4b",
    "name": "Nothing Phone 4b",
    "brand": "Nothing",
    "image": "/phones/nothing-phone-4b.webp",
    "price": null,
    "featured": true,
    "bestPrice": true,
    "published": true
  },
  {
    "id": 35,
    "slug": "phone-4a",
    "name": "Phone 4a",
    "brand": "Nothing",
    "image": "/phones/phone-4a.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 36,
    "slug": "phone-4a-pro",
    "name": "Phone 4a Pro",
    "brand": "Nothing",
    "image": "/phones/phone-4a-pro.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 37,
    "slug": "oneplus-15r",
    "name": "OnePlus 15r",
    "brand": "OnePlus",
    "image": "/phones/oneplus-15r.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 38,
    "slug": "oneplus-nord-ce5",
    "name": "OnePlus Nord CE5",
    "brand": "OnePlus",
    "image": "/phones/oneplus-nord-ce5.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 39,
    "slug": "oneplus-nord-ce6",
    "name": "OnePlus Nord CE6",
    "brand": "OnePlus",
    "image": "/phones/oneplus-nord-ce6.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 40,
    "slug": "oneplus-nord-ce6-lite",
    "name": "OnePlus Nord CE6 Lite",
    "brand": "OnePlus",
    "image": "/phones/oneplus-nord-ce6-lite.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 41,
    "slug": "a6c",
    "name": "A6C",
    "brand": "OPPO",
    "image": "/phones/a6c.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 42,
    "slug": "find-x9s",
    "name": "Find X9S",
    "brand": "OPPO",
    "image": "/phones/find-x9s.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 43,
    "slug": "reno16-5g",
    "name": "RENO16 5G",
    "brand": "OPPO",
    "image": "/phones/reno16-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 44,
    "slug": "reno16c-5g",
    "name": "RENO16C 5G",
    "brand": "OPPO",
    "image": "/phones/reno16c-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 45,
    "slug": "poco-c71",
    "name": "POCO C71",
    "brand": "POCO",
    "image": "/phones/poco-c71.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 46,
    "slug": "poco-c75-5g",
    "name": "POCO C75 5G",
    "brand": "POCO",
    "image": "/phones/poco-c75-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 47,
    "slug": "poco-m7pro",
    "name": "POCO M7PRO",
    "brand": "POCO",
    "image": "/phones/poco-m7pro.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 48,
    "slug": "poco-x7-pro",
    "name": "POCO X7 Pro",
    "brand": "POCO",
    "image": "/phones/poco-x7-pro.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 49,
    "slug": "realme-16x-5g",
    "name": "realme 16x 5G",
    "brand": "realme",
    "image": "/phones/realme-16x-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 50,
    "slug": "realme-c100i",
    "name": "realme C100I",
    "brand": "realme",
    "image": "/phones/realme-c100i.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 51,
    "slug": "realme-c100x",
    "name": "realme C100X",
    "brand": "realme",
    "image": "/phones/realme-c100x.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 52,
    "slug": "realme-p4s-5g",
    "name": "realme P4S 5G",
    "brand": "realme",
    "image": "/phones/realme-p4s-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 53,
    "slug": "redmi-note-15",
    "name": "Redmi Note 15",
    "brand": "Redmi",
    "image": "/phones/redmi-note-15.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 54,
    "slug": "redmi-note-15-pro-5g",
    "name": "Redmi Note 15 Pro 5G",
    "brand": "Redmi",
    "image": "/phones/redmi-note-15-pro-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 55,
    "slug": "redmi-note-15-pro-plus-5g",
    "name": "Redmi Note 15 Pro+ 5G",
    "brand": "Redmi",
    "image": "/phones/redmi-note-15-pro-plus-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 56,
    "slug": "redmi-note-17-5g",
    "name": "Redmi Note 17 5G",
    "brand": "Redmi",
    "image": "/phones/redmi-note-17-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 57,
    "slug": "galaxy-z-flip8",
    "name": "Galaxy Z FLIP8",
    "brand": "Samsung",
    "image": "/phones/galaxy-z-flip8.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 58,
    "slug": "galaxy-z-fold8",
    "name": "Galaxy Z FOLD8",
    "brand": "Samsung",
    "image": "/phones/galaxy-z-fold8.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 59,
    "slug": "galaxy-z-fold8-ultra",
    "name": "Galaxy Z FOLD8 Ultra",
    "brand": "Samsung",
    "image": "/phones/galaxy-z-fold8-ultra.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 60,
    "slug": "samsung-galaxy-f70-pro-5g",
    "name": "Samsung Galaxy F70 Pro 5G",
    "brand": "Samsung",
    "image": "/phones/samsung-galaxy-f70-pro-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 61,
    "slug": "spark-go-3-pro",
    "name": "Spark Go 3 Pro",
    "brand": "TECNO",
    "image": "/phones/spark-go-3-pro.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 62,
    "slug": "tecno-pova-8-5g",
    "name": "TECNO Pova 8 5G",
    "brand": "TECNO",
    "image": "/phones/tecno-pova-8-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 63,
    "slug": "tecno-pova-8-pro-5g",
    "name": "TECNO Pova 8 Pro 5G",
    "brand": "TECNO",
    "image": "/phones/tecno-pova-8-pro-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 64,
    "slug": "tecno-pova-8-pro-5g-tonino-lamborghini",
    "name": "TECNO Pova 8 Pro 5G Tonino Lamborghini",
    "brand": "TECNO",
    "image": "/phones/tecno-pova-8-pro-5g-tonino-lamborghini.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 65,
    "slug": "vivo-s2",
    "name": "vivo S2",
    "brand": "vivo",
    "image": "/phones/vivo-s2.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 66,
    "slug": "vivo-t5-lite-44w-5g",
    "name": "vivo T5 Lite 44w 5G",
    "brand": "vivo",
    "image": "/phones/vivo-t5-lite-44w-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 67,
    "slug": "vivo-t5x-5g",
    "name": "vivo T5X 5G",
    "brand": "vivo",
    "image": "/phones/vivo-t5x-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 68,
    "slug": "vivo-y31t-5g",
    "name": "vivo Y31T 5G",
    "brand": "vivo",
    "image": "/phones/vivo-y31t-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 69,
    "slug": "redmi-turbo-5",
    "name": "Redmi Turbo 5",
    "brand": "Xiaomi",
    "image": "/phones/redmi-turbo-5.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 70,
    "slug": "xiaomi-15-5g",
    "name": "Xiaomi 15 5G",
    "brand": "Xiaomi",
    "image": "/phones/xiaomi-15-5g.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 71,
    "slug": "xiaomi-15-ultra",
    "name": "Xiaomi 15 Ultra",
    "brand": "Xiaomi",
    "image": "/phones/xiaomi-15-ultra.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  },
  {
    "id": 72,
    "slug": "xiaomi-pad-7",
    "name": "Xiaomi Pad 7",
    "brand": "Xiaomi",
    "image": "/phones/xiaomi-pad-7.webp",
    "price": null,
    "featured": false,
    "bestPrice": false,
    "published": true
  }
];
