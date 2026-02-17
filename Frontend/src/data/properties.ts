import type { Property } from '../types';

export const properties: Property[] = [
  // ── Bandlaguda & Attapur Luxury Villas ────────────────────────────────
  {
    id: 'prop-001',
    title: 'IAC Serenity Villa – Luxury Hilltop Living',
    slug: 'iac-serenity-villa-bandlaguda',
    description:
      'Experience unparalleled luxury in this 4-BHK villa set amid lush greenery in the serene surroundings of Bandlaguda Jagir. Crafted with premium Italian marble flooring, floor-to-ceiling windows, and a private infinity pool, this residence redefines premium living in Hyderabad.',
    type: 'villa',
    status: 'available',
    projectStatus: 'completed',
    price: 30000000, // ₹3 Cr
    pricePerSqFt: 8570,
    area: 3500,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    floor: 0,
    totalFloors: 2,
    facing: 'West',
    location: {
      address: 'Survey No. 142, Bandlaguda Jagir Main Road',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500072',
      latitude: 17.3549,
      longitude: 78.3830,
      landmark: 'Near Bandlaguda Jagir Junction',
    },
    amenities: [
      'Private Infinity Pool',
      'Landscaped Gardens',
      'Home Automation',
      'CCTV Surveillance',
      'Power Backup',
      'Covered Car Parking',
      'Outdoor BBQ Area',
      'Terrace Lounge Area',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Foundation', value: 'RCC Raft Foundation' },
          { label: 'Walls', value: 'AAC Blocks with Plastering' },
          { label: 'Roofing', value: 'Mangalore Tile over RCC Slab' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Italian Marble' },
          { label: 'Bedrooms', value: 'Engineered Hardwood' },
          { label: 'Bathrooms', value: 'Anti-skid Vitrified Tiles' },
        ],
      },
      {
        category: 'Fittings',
        items: [
          { label: 'Kitchen', value: 'Modular Kitchen with Granite Counter' },
          { label: 'Sanitary Ware', value: 'Kohler / Grohe Premium' },
          { label: 'Electrical', value: 'Havells Modular Switches' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: true,
    hasVideo: true,
    reraNumber: 'TS-RERA/PRJ/HYD/2024/001234',
    possessionDate: '2025-06-30',
    builder: 'IAC Constructions',
    featured: true,
    createdAt: '2024-08-15',
  },
  {
    id: 'prop-002',
    title: 'IAC Greenwoods Villa – Serene Retreat',
    slug: 'iac-greenwoods-villa-attapur',
    description:
      'A stunning 3-BHK independent villa in Attapur surrounded by landscaped gardens and green spaces. This home features a courtyard-style layout blending traditional and contemporary architecture with modern comforts including VRV air conditioning and smart security systems.',
    type: 'villa',
    status: 'available',
    projectStatus: 'ongoing',
    price: 15000000, // ₹1.5 Cr
    pricePerSqFt: 6250,
    area: 2400,
    bedrooms: 3,
    bathrooms: 4,
    balconies: 2,
    floor: 0,
    totalFloors: 2,
    facing: 'East',
    location: {
      address: 'Plot No. 78, Attapur Green Avenue',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500048',
      latitude: 17.3687,
      longitude: 78.4253,
      landmark: 'Near Pillar No. 169, Attapur Metro Station',
    },
    amenities: [
      'Landscaped Gardens',
      'Gymnasium',
      'Children\'s Play Area',
      'Jogging Track',
      'CCTV Surveillance',
      'Power Backup',
      'Rainwater Harvesting',
      'Solar Water Heater',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Foundation', value: 'RCC Column & Beam' },
          { label: 'Walls', value: 'Laterite & Red Brick Combination' },
          { label: 'Roofing', value: 'Clay Tile Roof with RCC Frame' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Polished Kota Stone' },
          { label: 'Bedrooms', value: 'Vitrified Tiles (800x800)' },
          { label: 'Bathrooms', value: 'Ceramic Anti-skid Tiles' },
        ],
      },
      {
        category: 'Fittings',
        items: [
          { label: 'Kitchen', value: 'Granite Platform with SS Sink' },
          { label: 'Sanitary Ware', value: 'Jaquar / Parryware' },
          { label: 'Electrical', value: 'Anchor Roma Switches' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: false,
    hasVideo: true,
    reraNumber: 'TS-RERA/PRJ/HYD/2025/000487',
    possessionDate: '2026-12-31',
    builder: 'IAC Constructions',
    featured: true,
    createdAt: '2025-01-10',
  },

  // ── Mehdipatnam & Tolichowki Apartments ───────────────────────────────
  {
    id: 'prop-003',
    title: 'IAC Skyline Residences – 3 BHK Premium Apartment',
    slug: 'iac-skyline-3bhk-mehdipatnam-hyderabad',
    description:
      'Elevate your lifestyle at IAC Skyline Residences in Mehdipatnam, Hyderabad. This 3-BHK apartment offers panoramic views of the city skyline, a fully modular kitchen, and access to a resort-style clubhouse. Located minutes away from HITEC City IT Hub.',
    type: 'apartment',
    status: 'available',
    projectStatus: 'ongoing',
    price: 12000000, // ₹1.2 Cr
    pricePerSqFt: 7500,
    area: 1600,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    floor: 14,
    totalFloors: 24,
    facing: 'North-East',
    location: {
      address: 'Tower B, IAC Skyline, Mehdipatnam Main Road',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500028',
      latitude: 17.3950,
      longitude: 78.4376,
      landmark: 'Near Mehdipatnam Bus Depot',
    },
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'Clubhouse',
      'CCTV Surveillance',
      'Power Backup',
      'Landscaped Gardens',
      'Children\'s Play Area',
      'Jogging Track',
      'Indoor Games Room',
      'Multipurpose Court',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Type', value: 'Earthquake Resistant RCC Frame' },
          { label: 'Walls', value: 'AAC Blocks with Weather-proof Paint' },
          { label: 'Ceiling Height', value: '10 ft (Slab to Slab)' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Double-charged Vitrified (800x1600)' },
          { label: 'Bedrooms', value: 'Wooden Laminate Flooring' },
          { label: 'Bathrooms', value: 'Anti-skid Designer Tiles' },
        ],
      },
      {
        category: 'Fittings',
        items: [
          { label: 'Kitchen', value: 'Modular Kitchen – Hettich Hardware' },
          { label: 'Sanitary Ware', value: 'Kohler / Duravit' },
          { label: 'Electrical', value: 'Schneider Modular Switches' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: true,
    hasVideo: true,
    reraNumber: 'TS-RERA/PRJ/HYD/2025/054321',
    possessionDate: '2027-03-31',
    builder: 'IAC Constructions',
    featured: true,
    createdAt: '2025-03-01',
  },
  {
    id: 'prop-004',
    title: 'IAC Urban Nest – Compact 2 BHK Smart Home',
    slug: 'iac-urban-nest-2bhk-tolichowki-hyderabad',
    description:
      'Smart, modern, and affordable – IAC Urban Nest offers thoughtfully designed 2-BHK apartments in the heart of Tolichowki. Pre-fitted with smart home automation, video door phone, and EV charging-ready parking.',
    type: 'apartment',
    status: 'available',
    projectStatus: 'upcoming',
    price: 5000000, // ₹50 L
    pricePerSqFt: 5555,
    area: 900,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    floor: 7,
    totalFloors: 18,
    facing: 'South-East',
    location: {
      address: 'Wing C, IAC Urban Nest, Tolichowki Main Road',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500008',
      latitude: 17.4010,
      longitude: 78.4187,
      landmark: 'Near Tolichowki Cross Roads',
    },
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'CCTV Surveillance',
      'Power Backup',
      'EV Charging Station',
      'Co-working Space',
      'Rooftop Garden',
      'Children\'s Play Area',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Type', value: 'RCC Framed Structure' },
          { label: 'Walls', value: 'Fly-ash Bricks' },
          { label: 'Ceiling Height', value: '9.5 ft (Slab to Slab)' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Vitrified Tiles (600x600)' },
          { label: 'Bedrooms', value: 'Vitrified Tiles (600x600)' },
          { label: 'Bathrooms', value: 'Ceramic Anti-skid Tiles' },
        ],
      },
      {
        category: 'Fittings',
        items: [
          { label: 'Kitchen', value: 'Granite Counter with SS Sink' },
          { label: 'Sanitary Ware', value: 'Parryware / Hindware' },
          { label: 'Electrical', value: 'HavellsDERA Switches' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: false,
    hasVideo: false,
    reraNumber: 'TS-RERA/PRJ/HYD/2025/067890',
    possessionDate: '2028-06-30',
    builder: 'IAC Constructions',
    featured: false,
    createdAt: '2025-06-01',
  },

  // ── Shamshabad & Rajendra Nagar Bungalows ─────────────────────────────
  {
    id: 'prop-005',
    title: 'IAC Shamshabad Greens – Premium Bungalow',
    slug: 'iac-shamshabad-greens-bungalow-hyderabad',
    description:
      'A beautifully designed 3-BHK bungalow in the rapidly developing Shamshabad area near Hyderabad International Airport. Set in a gated community with wide internal roads, 24×7 security, and ample greenery. Ideal for families seeking peace with connectivity.',
    type: 'bungalow',
    status: 'available',
    projectStatus: 'completed',
    price: 7500000, // ₹75 L
    pricePerSqFt: 3750,
    area: 2000,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 1,
    floor: 0,
    totalFloors: 2,
    facing: 'North',
    location: {
      address: 'Plot 34, IAC Shamshabad Greens, Shamshabad Main Road',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500089',
      latitude: 17.2543,
      longitude: 78.3756,
      landmark: 'Near Rajiv Gandhi International Airport',
    },
    amenities: [
      'Clubhouse',
      'Children\'s Play Area',
      'Landscaped Gardens',
      'CCTV Surveillance',
      'Power Backup',
      'Community Hall',
      'Jogging Track',
      'Temple',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Foundation', value: 'Isolated Footing' },
          { label: 'Walls', value: 'Red Brick – 9" External, 4.5" Internal' },
          { label: 'Roofing', value: 'RCC Flat Slab with Waterproofing' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Vitrified Tiles (600x600)' },
          { label: 'Bedrooms', value: 'Vitrified Tiles (600x600)' },
          { label: 'Bathrooms', value: 'Anti-skid Ceramic Tiles' },
        ],
      },
      {
        category: 'Fittings',
        items: [
          { label: 'Kitchen', value: 'Granite Platform with Stainless Steel Sink' },
          { label: 'Sanitary Ware', value: 'Hindware Standard' },
          { label: 'Electrical', value: 'Anchor Penta Switches' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: false,
    hasVideo: false,
    reraNumber: 'TS-RERA/PRJ/HYD/2024/000312',
    possessionDate: '2025-03-31',
    builder: 'IAC Constructions',
    featured: false,
    createdAt: '2024-05-20',
  },
  {
    id: 'prop-006',
    title: 'IAC Heritage Homes – Affordable Bungalow',
    slug: 'iac-heritage-homes-bungalow-rajendranagar',
    description:
      'Own your dream home at an unbeatable price. IAC Heritage Homes offers well-planned 2-BHK bungalows in a serene locality of Rajendra Nagar, Hyderabad with dedicated parking, kitchen garden space, and modern amenities at a budget-friendly price point.',
    type: 'bungalow',
    status: 'available',
    projectStatus: 'ongoing',
    price: 3500000, // ₹35 L
    pricePerSqFt: 2917,
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    floor: 0,
    totalFloors: 1,
    facing: 'East',
    location: {
      address: 'Plot 12A, IAC Heritage Homes, Rajendra Nagar Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500052',
      latitude: 17.3150,
      longitude: 78.4057,
      landmark: 'Near Rajendra Nagar GHMC Office',
    },
    amenities: [
      'Gated Community',
      'CCTV Surveillance',
      'Power Backup',
      'Community Park',
      'Water Purifier Provision',
      'Kitchen Garden Space',
      'Covered Parking',
      'Bore Well',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Foundation', value: 'PCC & Isolated Footing' },
          { label: 'Walls', value: 'Red Brick – 9" External' },
          { label: 'Roofing', value: 'RCC Slab with Slope Roof' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Ceramic Tiles (600x600)' },
          { label: 'Bedrooms', value: 'Ceramic Tiles (600x600)' },
          { label: 'Bathrooms', value: 'Anti-skid Tiles' },
        ],
      },
      {
        category: 'Fittings',
        items: [
          { label: 'Kitchen', value: 'Kadappa Stone Platform with SS Sink' },
          { label: 'Sanitary Ware', value: 'Hindware / Cera' },
          { label: 'Electrical', value: 'Standard Modular Switches' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: false,
    hasVideo: false,
    reraNumber: 'TS-RERA/PRJ/HYD/2025/000198',
    possessionDate: '2026-09-30',
    builder: 'IAC Constructions',
    featured: false,
    createdAt: '2025-04-15',
  },

  // ── HITEC City Commercial ─────────────────────────────────────────────
  {
    id: 'prop-007',
    title: 'IAC Business Hub – Grade A Commercial Space',
    slug: 'iac-business-hub-commercial-hiteccity-hyderabad',
    description:
      'Premium Grade A commercial office space in the thriving HITEC City business district. Features include a grand double-height lobby, high-speed elevators, centralized HVAC, and IGBC Green Building certification. Perfect for IT companies, co-working operators, and corporate headquarters.',
    type: 'commercial',
    status: 'available',
    projectStatus: 'ongoing',
    price: 20000000, // ₹2 Cr
    pricePerSqFt: 10000,
    area: 2000,
    bedrooms: 0,
    bathrooms: 2,
    balconies: 0,
    floor: 5,
    totalFloors: 12,
    facing: 'North-West',
    location: {
      address: '5th Floor, IAC Business Hub, HITEC City Main Road',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      latitude: 17.4435,
      longitude: 78.3772,
      landmark: 'Near HITEC City Metro Station',
    },
    amenities: [
      'High-speed Elevators',
      'Centralized HVAC',
      'Power Backup – 100%',
      'CCTV Surveillance',
      'Cafeteria',
      'Visitor Parking',
      'Fire Safety Systems',
      'Conference Room Access',
      'IGBC Green Certification',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Type', value: 'Steel & RCC Composite Frame' },
          { label: 'Facade', value: 'Double-glazed Curtain Wall' },
          { label: 'Floor Load', value: '4 kN/sq.m Live Load' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Office Area', value: 'Raised Access Flooring (600x600)' },
          { label: 'Lobby', value: 'Italian Marble' },
          { label: 'Washrooms', value: 'Full-height Ceramic Tiles' },
        ],
      },
      {
        category: 'MEP',
        items: [
          { label: 'Power', value: 'DG Backup with Auto Changeover' },
          { label: 'Fire Safety', value: 'Sprinkler + Smoke Detection + PA' },
          { label: 'Networking', value: 'CAT 6A Cabling Ready' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: true,
    hasVideo: false,
    reraNumber: 'TS-RERA/PRJ/HYD/2025/078456',
    possessionDate: '2027-06-30',
    builder: 'IAC Constructions',
    featured: true,
    createdAt: '2025-02-01',
  },

  // ── Jubilee Hills Penthouse ───────────────────────────────────────────
  {
    id: 'prop-008',
    title: 'IAC Horizon – Ultra Luxury Penthouse',
    slug: 'iac-horizon-penthouse-jubilee-hills-hyderabad',
    description:
      'The crown jewel of IAC Horizon – a sprawling 5-BHK duplex penthouse overlooking Jubilee Hills and the Hyderabad skyline. Features include a private rooftop terrace with a plunge pool, home theatre, wine cellar, and a personal elevator. Only one unit available.',
    type: 'penthouse',
    status: 'reserved',
    projectStatus: 'ongoing',
    price: 40000000, // ₹4 Cr
    pricePerSqFt: 10000,
    area: 4000,
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    floor: 29,
    totalFloors: 30,
    facing: 'West',
    location: {
      address: 'Floor 29-30, IAC Horizon Tower, Road No. 36, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
      latitude: 17.4325,
      longitude: 78.4073,
      landmark: 'Near Jubilee Hills Check Post',
    },
    amenities: [
      'Private Rooftop Terrace',
      'Plunge Pool',
      'Home Theatre',
      'Wine Cellar',
      'Personal Elevator',
      'Swimming Pool',
      'Gymnasium',
      'Clubhouse',
      'Concierge Service',
      'Helipad Access',
      'CCTV Surveillance',
      'Power Backup – 100%',
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Type', value: 'RCC Shear Wall + Frame Structure' },
          { label: 'Facade', value: 'Unitized Curtain Wall Glazing' },
          { label: 'Ceiling Height', value: '12 ft (Double Height Living)' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Imported Statuario Marble' },
          { label: 'Bedrooms', value: 'European Oak Hardwood' },
          { label: 'Bathrooms', value: 'Book-matched Italian Marble' },
        ],
      },
      {
        category: 'Fittings',
        items: [
          { label: 'Kitchen', value: 'Poggenpohl Modular Kitchen' },
          { label: 'Sanitary Ware', value: 'Villeroy & Boch / Hansgrohe' },
          { label: 'Electrical', value: 'Lutron Smart Lighting & Automation' },
        ],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=500&fit=crop',
    has3DTour: true,
    hasVideo: true,
    reraNumber: 'TS-RERA/PRJ/HYD/2025/001678',
    possessionDate: '2027-12-31',
    builder: 'IAC Constructions',
    featured: true,
    createdAt: '2025-05-01',
  },
];

/**
 * Helper: Format price in Indian Lakhs / Crores.
 */
export function formatIndianPrice(price: number): string {
  if (price >= 10000000) {
    const crores = price / 10000000;
    return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Cr`;
  }
  const lakhs = price / 100000;
  return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2)} L`;
}

/**
 * Get featured properties.
 */
export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

/**
 * Get property by slug.
 */
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
