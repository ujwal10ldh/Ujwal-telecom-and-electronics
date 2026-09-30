import { Category, CustomerReview, Product, StoreInfo } from '../types';

export const STORE_INFO: StoreInfo = {
  name: 'Ujwal Telecom & Electronics',
  address: 'Street No. 1, Maha Luxmi Nagar, Lohara',
  landmark: 'Near Lohara Main Road',
  cityStatePincode: 'Ludhiana, Punjab 141016',
  phone: '+919803679285',
  phoneDisplay: '+91 98036 79285',
  whatsapp: '919803679285',
  whatsappDisplay: '+91 98036 79285',
  email: 'ujwalhack123@gmail.com',
  businessHours: 'Monday – Saturday: 9:30 AM – 9:00 PM',
  sundayHours: 'Sunday: 10:00 AM – 8:30 PM',
  googleMapsEmbedUrl: 'https://www.google.com/maps?q=Maha+Luxmi+Nagar+Lohara+Ludhiana+Punjab+141016&output=embed',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Maha+Luxmi+Nagar+Lohara+Ludhiana+Punjab+141016'
};

export const CATEGORIES: Category[] = [
  {
    id: 'mobile-phones',
    name: 'Mobile Phones',
    itemCount: 24,
    iconName: 'Smartphone',
    description: 'Latest 5G smartphones, flagship devices & reliable feature phones.'
  },
  {
    id: 'mobile-accessories',
    name: 'Mobile Accessories',
    itemCount: 88,
    iconName: 'ShieldCheck',
    description: 'Tempered glass, military-grade cases, car mounts & camera protectors.'
  },
  {
    id: 'chargers-cables',
    name: 'Chargers & Cables',
    itemCount: 46,
    iconName: 'Zap',
    description: 'GaN fast adapters, braided 100W Type-C cables & wireless charging pads.'
  },
  {
    id: 'earphones-headphones',
    name: 'Earphones & Headphones',
    itemCount: 52,
    iconName: 'Headphones',
    description: 'True wireless ANC earbuds, studio over-ear headphones & neckbands.'
  },
  {
    id: 'smart-watches',
    name: 'Smart Watches',
    itemCount: 31,
    iconName: 'Watch',
    description: 'AMOLED fitness trackers, Bluetooth calling watches & sports wearables.'
  },
  {
    id: 'bluetooth-speakers',
    name: 'Bluetooth Speakers',
    itemCount: 28,
    iconName: 'Speaker',
    description: 'Waterproof portable speakers, party sound towers & studio monitors.'
  },
  {
    id: 'power-banks',
    name: 'Power Banks',
    itemCount: 19,
    iconName: 'BatteryCharging',
    description: 'Fast-charging 10,000mAh to 30,000mAh external battery packs with PD.'
  },
  {
    id: 'tvs-entertainment',
    name: 'TVs & Entertainment',
    itemCount: 15,
    iconName: 'Tv',
    description: '4K Ultra HD smart televisions, streaming sticks & soundbars.'
  },
  {
    id: 'home-appliances',
    name: 'Home Appliances',
    itemCount: 22,
    iconName: 'Home',
    description: 'Smart air purifiers, robotic cleaners, garment steamers & kitchen tech.'
  },
  {
    id: 'computer-accessories',
    name: 'Computer Accessories',
    itemCount: 42,
    iconName: 'Laptop',
    description: 'Mechanical keyboards, wireless precision mice, USB-C docks & laptop stands.'
  },
  {
    id: 'networking',
    name: 'Networking',
    itemCount: 18,
    iconName: 'Wifi',
    description: 'Dual-band Wi-Fi 6 routers, range extenders, switches & gigabit ethernet cables.'
  },
  {
    id: 'cctv-security',
    name: 'CCTV & Security',
    itemCount: 16,
    iconName: 'Camera',
    description: 'Smart 360° Wi-Fi cameras, video doorbells, night-vision outdoor security.'
  },
  {
    id: 'other-electronics',
    name: 'Other Electronics',
    itemCount: 35,
    iconName: 'Cpu',
    description: 'Surge protectors, multimedia remotes, adapters, calculators & testing tools.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ujw-001',
    name: 'Apex Pro 5G Flagship Smartphone (256GB)',
    category: 'Mobile Phones',
    images: [
      '/src/assets/images/product_flagship_phone_1790778362839.jpg',
      '/src/assets/images/hero_electronics_showcase_1790778317963.jpg'
    ],
    price: 49999,
    originalPrice: 59999,
    discount: 17,
    shortDescription: '6.7" 120Hz LTPO AMOLED, 50MP OIS Quad Camera, 5000mAh Battery with 80W Super Charging.',
    description: 'Experience flagship grade performance with titanium-alloy frame, ultra-responsive 120Hz display, and advanced thermal management. Includes 1-year manufacturer warranty and complimentary screen replacement insurance for 6 months.',
    specifications: {
      'Display': '6.7-inch Quad HD+ AMOLED, 120Hz Adaptive',
      'Processor': 'Octa-core 4nm Flagship Chipset',
      'Rear Camera': '50MP Primary (OIS) + 48MP Ultra-Wide + 12MP Telephoto',
      'Front Camera': '32MP HDR Selfie',
      'Battery & Charging': '5000mAh, 80W Fast Charge (0-100% in 28 mins)',
      'Storage / RAM': '256GB UFS 4.0 / 12GB LPDDR5X',
      'Connectivity': '5G Dual SIM, Wi-Fi 6E, Bluetooth 5.3, NFC'
    },
    stockStatus: 'in_stock',
    stockCount: 8,
    rating: 4.8,
    reviewsCount: 124,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isSpecialOffer: true,
    brand: 'Apex Tech',
    warranty: '1 Year Brand Warranty + 6 Months Screen Protection'
  },
  {
    id: 'ujw-002',
    name: 'Acoustic Elite ANC True Wireless Earbuds',
    category: 'Earphones & Headphones',
    images: [
      '/src/assets/images/product_anc_earbuds_1790778376314.jpg',
      '/src/assets/images/hero_electronics_showcase_1790778317963.jpg'
    ],
    price: 4499,
    originalPrice: 7999,
    discount: 44,
    shortDescription: 'Active Noise Cancellation up to 42dB, Transparency mode, 36h total playtime with wireless charging case.',
    description: 'Immerse yourself in high-resolution audio with custom titanium 11mm acoustic drivers. Features quad-mic Environmental Noise Cancellation for crystal-clear calling in bustling Indian markets or commute.',
    specifications: {
      'Audio Driver': '11mm Titanium Dynamic Driver',
      'Noise Cancellation': 'Hybrid Active Noise Cancellation (up to 42dB)',
      'Battery Life': '8h single charge (ANC off) / 36h with case',
      'Charging': 'USB Type-C Fast Charge + Qi Wireless Charging',
      'Water Resistance': 'IPX5 Sweat & Water Resistant',
      'Bluetooth': 'v5.3 with Low Latency Gaming Mode (45ms)'
    },
    stockStatus: 'in_stock',
    stockCount: 22,
    rating: 4.7,
    reviewsCount: 218,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isSpecialOffer: true,
    brand: 'Acoustic Sound',
    warranty: '1 Year Doorstep Replacement Warranty'
  },
  {
    id: 'ujw-003',
    name: 'Titan Horizon Smart Watch with AMOLED Display',
    category: 'Smart Watches',
    images: [
      '/src/assets/images/hero_electronics_showcase_1790778317963.jpg'
    ],
    price: 3299,
    originalPrice: 5499,
    discount: 40,
    shortDescription: '1.43" Vivid AMOLED Always-On screen, BT calling with noise-canceling mic, 100+ sports modes, 7-day battery.',
    description: 'Crafted with premium zinc alloy casing and scratch-resistant curved glass. Accurate SpO2, continuous 24/7 heart rate monitoring, sleep staging analysis, and Hindi/English interface support.',
    specifications: {
      'Display': '1.43-inch HD AMOLED, 466x466 resolution, 650 nits',
      'Calling': 'Bluetooth Calling with HD Speaker & Microphone',
      'Health Tracking': 'Heart Rate, Blood Oxygen (SpO2), Sleep, Stress Level',
      'Battery': 'Up to 7 days normal use, 20 days standby',
      'Durability': 'IP68 Dust & Water Proof',
      'Sensors': '3-axis Accelerometer, Optical PPG sensor'
    },
    stockStatus: 'in_stock',
    stockCount: 15,
    rating: 4.6,
    reviewsCount: 89,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    brand: 'Titan Pulse',
    warranty: '1 Year Official Manufacturer Warranty'
  },
  {
    id: 'ujw-004',
    name: '65W GaN Triple-Port Fast Wall Charger',
    category: 'Chargers & Cables',
    images: [
      '/src/assets/images/promo_upgrade_offer_1790778337856.jpg'
    ],
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    shortDescription: 'Next-gen Gallium Nitride tech with 2x USB-C (PD 3.0) and 1x USB-A (QC 4.0). Charges laptops, tablets & phones.',
    description: 'Compact 65W GaN adapter engineered for Indian voltage surges (up to 380V protection). Power up your MacBook, iPhone, Samsung, OnePlus or Dell laptop at full speed without heating up.',
    specifications: {
      'Technology': 'Gallium Nitride (GaN III) Semiconductor',
      'Output Ports': '2x Type-C + 1x Type-A',
      'Total Output': '65W Max Power Delivery',
      'Safety': 'Over-voltage, short-circuit & thermal surge guard',
      'Compatibility': 'Supports PD 3.0, PPS, QC 4.0+, Dash/VOOC protocols'
    },
    stockStatus: 'in_stock',
    stockCount: 34,
    rating: 4.9,
    reviewsCount: 167,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    brand: 'VoltCraft',
    warranty: '18 Months Replacement Warranty'
  },
  {
    id: 'ujw-005',
    name: 'BoomBass 24W Rugged Bluetooth Speaker',
    category: 'Bluetooth Speakers',
    images: [
      '/src/assets/images/promo_upgrade_offer_1790778337856.jpg'
    ],
    price: 2699,
    originalPrice: 4299,
    discount: 37,
    shortDescription: '24W Stereo drivers with dual passive radiators, IPX7 waterproof, 18 hours playtime & RGB beat lights.',
    description: 'Deep punchy bass tuned for indoor gatherings and outdoor adventures. Features True Wireless Stereo (TWS) pairing to sync two speakers simultaneously for room-filling sound.',
    specifications: {
      'Audio Output': '24W RMS (Dual 12W Drivers + Dual Passive Radiators)',
      'Battery': '4400mAh rechargeable lithium-ion (18h runtime)',
      'Waterproof Rating': 'IPX7 can be submerged up to 1 meter',
      'Inputs': 'Bluetooth 5.3, AUX 3.5mm, MicroSD TF card slot, USB drive',
      'Lighting': '6 Dynamic RGB equalizer lighting modes'
    },
    stockStatus: 'in_stock',
    stockCount: 19,
    rating: 4.6,
    reviewsCount: 94,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    brand: 'BoomSound',
    warranty: '1 Year Comprehensive Warranty'
  },
  {
    id: 'ujw-006',
    name: '20,000mAh Ultra-Slim 22.5W Power Bank',
    category: 'Power Banks',
    images: [
      '/src/assets/images/hero_electronics_showcase_1790778317963.jpg'
    ],
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    shortDescription: 'High-density Lithium Polymer battery with 22.5W two-way fast charging, digital percentage display & 3 output ports.',
    description: 'Charge up to 3 devices simultaneously on the go. Meets BIS safety standards with multi-layer circuit protection against overcharging, deep discharge, and short circuits.',
    specifications: {
      'Capacity': '20,000mAh (74Wh) High-Density Li-Polymer',
      'Max Output': '22.5W Fast Charging (QC 3.0 & PD 3.0)',
      'Input Ports': 'Type-C (18W input) & Micro-USB',
      'Output Ports': '2x USB-A (22.5W) + 1x Type-C Two-Way (20W PD)',
      'Display': 'LED Smart Digital Battery Level Indicator'
    },
    stockStatus: 'in_stock',
    stockCount: 28,
    rating: 4.8,
    reviewsCount: 310,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    brand: 'PowerMax',
    warranty: '1 Year Replacement Warranty'
  },
  {
    id: 'ujw-007',
    name: 'Heavy-Duty 100W Braided Type-C to Type-C Cable (2m)',
    category: 'Chargers & Cables',
    images: [
      '/src/assets/images/product_flagship_phone_1790778362839.jpg'
    ],
    price: 499,
    originalPrice: 999,
    discount: 50,
    shortDescription: 'E-Marker chip with 100W Power Delivery, zinc-alloy connectors and 25,000+ bend lifespan nylon braiding.',
    description: 'High performance data sync (480Mbps) and high-speed fast charging cable compatible with MacBooks, iPads, Galaxy phones, and all Type-C laptops and smartphones.',
    specifications: {
      'Connector': 'USB Type-C to Type-C (reversible)',
      'Power Rating': '100W (20V / 5A) with Smart E-Marker IC',
      'Length': '2 Meters (6.6 Feet)',
      'Material': 'Double-braided ballistic nylon with aluminum alloy shell'
    },
    stockStatus: 'in_stock',
    stockCount: 65,
    rating: 4.7,
    reviewsCount: 142,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    brand: 'VoltCraft',
    warranty: '1 Year Warranty'
  },
  {
    id: 'ujw-008',
    name: 'Over-Ear Studio Wireless Headphones with ANC',
    category: 'Earphones & Headphones',
    images: [
      '/src/assets/images/hero_electronics_showcase_1790778317963.jpg'
    ],
    price: 5999,
    originalPrice: 9999,
    discount: 40,
    shortDescription: '40mm Neodymium dynamic drivers, memory foam earcups, 50-hour battery life and multi-point Bluetooth connection.',
    description: 'Engineered for audio engineers, remote professionals, and music enthusiasts. Delivers balanced studio sound with deep acoustic sub-bass and crisp highs. Folds flat with hard travel pouch.',
    specifications: {
      'Acoustic Driver': '40mm Custom Tuned Neodymium',
      'Active Noise Cancellation': 'Dual-Mic Feedforward ANC (up to 38dB)',
      'Battery Life': 'Up to 50 hours (ANC off), 35 hours (ANC on)',
      'Multipoint Connection': 'Pair with 2 devices simultaneously',
      'Weight': '248 grams lightweight ergonomic design'
    },
    stockStatus: 'in_stock',
    stockCount: 11,
    rating: 4.8,
    reviewsCount: 76,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    brand: 'Acoustic Sound',
    warranty: '1 Year Brand Replacement Warranty'
  },
  {
    id: 'ujw-009',
    name: '50-Inch 4K Ultra HD Smart Frameless Android TV',
    category: 'TVs & Entertainment',
    images: [
      '/src/assets/images/promo_upgrade_offer_1790778337856.jpg'
    ],
    price: 32999,
    originalPrice: 46999,
    discount: 30,
    shortDescription: 'Dolby Vision & Atmos, 1.07 Billion Colors, Google TV OS, Chromecast built-in with 30W Soundbar speakers.',
    description: 'Bring cinema into your living room with ultra-slim metal bezel design, Quantum Color HDR10+ certification, and voice remote with Google Assistant.',
    specifications: {
      'Display': '50-inch 4K UHD (3840x2160), 60Hz MEMC, HDR10+, Dolby Vision',
      'Sound': '30W Box Speakers with Dolby Atmos & DTS Virtual:X',
      'Operating System': 'Google TV with Play Store, Netflix, Prime, Hotstar',
      'Ports': '3x HDMI 2.1 (eARC), 2x USB, Optical Audio, LAN, Bluetooth 5.1'
    },
    stockStatus: 'in_stock',
    stockCount: 6,
    rating: 4.9,
    reviewsCount: 52,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    brand: 'VisionPlus',
    warranty: '2 Years Comprehensive On-Site Warranty'
  },
  {
    id: 'ujw-010',
    name: 'Smart 360° Wi-Fi Home Security Camera (2K Quad HD)',
    category: 'CCTV & Security',
    images: [
      '/src/assets/images/hero_electronics_showcase_1790778317963.jpg'
    ],
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    shortDescription: '2K resolution, pan-tilt 360° coverage, smart human motion detection, 2-way audio & full-color night vision.',
    description: 'Keep your home or shop safe 24/7. Live remote monitoring from your smartphone, cloud/microSD recording support up to 256GB, and instant siren alarm upon intruder detection.',
    specifications: {
      'Resolution': '2K Quad HD (2304 x 1296 pixels)',
      'Field of View': '360° Horizontal Pan, 114° Vertical Tilt',
      'Night Vision': 'Color Night Vision up to 30 feet in darkness',
      'Storage': 'MicroSD card slot (supports up to 256GB) + Cloud Storage',
      'Features': 'AI Human Detection, Motion Tracking, Two-way Talk'
    },
    stockStatus: 'in_stock',
    stockCount: 18,
    rating: 4.7,
    reviewsCount: 145,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    brand: 'SecureView',
    warranty: '1 Year Replacement Warranty'
  },
  {
    id: 'ujw-011',
    name: 'AX3000 Dual-Band Wi-Fi 6 Gigabit Router',
    category: 'Networking',
    images: [
      '/src/assets/images/promo_upgrade_offer_1790778337856.jpg'
    ],
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    shortDescription: 'Next-gen Wi-Fi 6 speeds up to 3000Mbps, 4 high-gain antennas with beamforming, OFDMA & MU-MIMO support.',
    description: 'Eliminate dead zones in your apartment or office. Connects up to 64 devices smoothly with ultra-low latency for 4K streaming, gaming, and work-from-home calls.',
    specifications: {
      'Standard': 'Wi-Fi 6 (802.11ax) Dual Band: 2402 Mbps (5GHz) + 574 Mbps (2.4GHz)',
      'Antennas': '4x High-Gain 5dBi external omnidirectional antennas',
      'Ports': '1x Gigabit WAN port + 4x Gigabit LAN ports',
      'Security': 'WPA3 encryption, Parental Controls, Guest Network'
    },
    stockStatus: 'in_stock',
    stockCount: 12,
    rating: 4.8,
    reviewsCount: 88,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    brand: 'NetWave',
    warranty: '3 Years Manufacturer Warranty'
  },
  {
    id: 'ujw-012',
    name: 'Ergonomic Wireless Mechanical Keyboard & Mouse Combo',
    category: 'Computer Accessories',
    images: [
      '/src/assets/images/hero_electronics_showcase_1790778317963.jpg'
    ],
    price: 3899,
    originalPrice: 6499,
    discount: 40,
    shortDescription: 'Hot-swappable brown tactile switches, dual-mode (2.4G & Bluetooth), rechargeable batteries, silent click mouse.',
    description: 'Elevate your typing comfort and productivity. Tenkeyless 84-key layout with aluminum top plate, gentle warm white LED backlighting, and 4000 DPI precision wireless laser mouse.',
    specifications: {
      'Connectivity': 'Bluetooth 5.0 + 2.4GHz Wireless Nano Receiver',
      'Switches': 'Tactile Quiet Brown Mechanical Switches (50M clicks life)',
      'Mouse Sensor': 'Optical High Precision 800 - 4000 DPI adjustable',
      'Battery': 'Type-C Rechargeable Keyboard (up to 4 weeks per charge)'
    },
    stockStatus: 'in_stock',
    stockCount: 14,
    rating: 4.7,
    reviewsCount: 63,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    brand: 'KeyPro Tech',
    warranty: '1 Year Warranty'
  }
];

export const TESTIMONIALS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Gurpreet Singh',
    city: 'Ludhiana',
    rating: 5,
    comment: 'Visited Ujwal Telecom & Electronics at Lohara for purchasing a new 5G phone and chargers. The staff explained the specifications clearly and transferred all my contacts and WhatsApp data patiently. Genuine products and reasonable prices.',
    productMentioned: 'Apex Pro 5G Flagship Smartphone',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'rev-2',
    customerName: 'Simranjeet Kaur',
    city: 'Ludhiana',
    rating: 5,
    comment: 'Got the Acoustic ANC Earbuds and a 20,000mAh power bank before my travel. Excellent sound quality and battery life! It is rare to find an electronics store where after-sales support is as good as the sales service.',
    productMentioned: 'Acoustic Elite ANC Earbuds',
    date: '1 month ago',
    verified: true
  },
  {
    id: 'rev-3',
    customerName: 'Harmanpreet Verma',
    city: 'Ludhiana',
    rating: 5,
    comment: 'Installed 360 degree security cameras in my shop through Ujwal Telecom in Maha Luxmi Nagar. Installation was done within 24 hours, and they configured the phone app setup seamlessly. Highly trusted local store!',
    productMentioned: 'Smart 360° Wi-Fi Home Security Camera',
    date: '3 weeks ago',
    verified: true
  },
  {
    id: 'rev-4',
    customerName: 'Rajinder Kumar',
    city: 'Ludhiana',
    rating: 5,
    comment: 'Purchased a 50-inch 4K Smart TV and a GaN fast charger. Delivered safely to my home in Lohara on the same day and tested before payment. Very courteous owner and genuine billing with manufacturer warranty.',
    productMentioned: '50-Inch 4K Ultra HD Smart TV',
    date: '5 days ago',
    verified: true
  }
];

export const TRUST_FEATURES = [
  {
    title: 'Genuine Products',
    desc: '100% authentic electronics sourced directly from certified brand distributors with valid GST invoices and official warranty.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Fast Local Service',
    desc: 'Same-day store pickup and lightning-fast local doorstep delivery in your neighborhood, plus immediate in-store testing.',
    icon: 'Truck'
  },
  {
    title: 'Secure Payments',
    desc: 'Pay safely via UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, or choose Cash on Delivery at your door.',
    icon: 'CreditCard'
  },
  {
    title: 'Customer Support',
    desc: 'Friendly phone and WhatsApp guidance for technical advice, warranty assistance, and honest recommendations from our experts.',
    icon: 'Headphones'
  }
];

export const FAQS = [
  {
    q: 'Are all products at Ujwal Telecom & Electronics original and covered by warranty?',
    a: 'Yes, absolutely. Every smartphone, accessory, and electronic device sold at Ujwal Telecom & Electronics is 100% genuine and sourced directly from official brand distributors. Each purchase comes with an official GST tax invoice and manufacturer warranty valid across India.'
  },
  {
    q: 'Can I visit the store to inspect the product before buying?',
    a: 'Yes! We encourage customers to visit our store during business hours (10:00 AM – 9:00 PM). You can try demo units, compare audio devices, and test mobile accessories before purchasing.'
  },
  {
    q: 'Do you offer doorstep delivery and Cash on Delivery (COD)?',
    a: 'Yes, we provide fast local delivery across the city. Cash on Delivery (COD) as well as UPI on delivery are supported for verified local addresses.'
  },
  {
    q: 'How does the return or replacement policy work?',
    a: 'If you receive a defective or damaged product, we provide an immediate 7-day store replacement assistance. In addition, brand-covered devices have full support at authorized service centers.'
  },
  {
    q: 'Can I order or enquire directly via WhatsApp or phone call?',
    a: 'Yes, click the "WhatsApp Us" or "Call Now" buttons anytime. Our store representative will assist you with stock availability, best offers, and direct checkout.'
  }
];
