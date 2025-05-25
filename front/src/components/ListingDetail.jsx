import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AddToCartButton from './AddToCartButton';

// Të dhënat demo për detajet e listimeve - të gjitha ID-të me foto profesionale
const demoListingDetails = {
  // Kategoria Pune (101-110)
  101: {
    id: 101,
    title: 'Kerkohet Programues React',
    price: '€80,000/vit',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Tirane',
    description: 'Kompania jone kerkon nje programues React me eksperience 2+ vite. Kerkohen njohuri te thella ne React, Redux, dhe TypeScript. Ofrojme nje ambient pune modern dhe mundesi zhvillimi karriere.',
    details: {
      company: 'TechAlbania',
      experience: '2+ vite',
      education: 'Bachelor ne Informatike ose ekuivalent',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@techalbania.al',
      publishedDate: '15 Maj, 2025'
    }
  },
  102: {
    id: 102,
    title: 'Specialist Marketing',
    price: '€65,000/vit',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Tirane',
    description: 'Kerkohet specialist marketing per zhvillimin e strategjive te marketingut dixhital. Eksperience ne social media marketing dhe SEO.',
    details: {
      company: 'MarketPro',
      experience: '1-3 vite',
      education: 'Bachelor ne Marketing',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@marketpro.al',
      publishedDate: '22 Maj, 2025'
    }
  },
  103: {
    id: 103,
    title: 'Menaxher Shitjesh',
    price: '€75,000/vit',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Durres',
    description: 'Pozicion per menaxher shitjesh me eksperience ne menaxhimin e ekipeve dhe strategjite e shitjes.',
    details: {
      company: 'SalesForce Albania',
      experience: '3+ vite',
      education: 'Bachelor ne Biznes',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@salesforce.al',
      publishedDate: '20 Maj, 2025'
    }
  },
  104: {
    id: 104,
    title: 'Asistent Administrativ',
    price: '€45,000/vit',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Vlore',
    description: 'Kerkohet asistent administrativ per mbeshtetjen e aktiviteteve te perditshme te zyres.',
    details: {
      company: 'AdminServices',
      experience: 'Pa eksperience',
      education: 'Diploma e mesme',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@adminservices.al',
      publishedDate: '18 Maj, 2025'
    }
  },
  105: {
    id: 105,
    title: 'Inxhinier Ndertimi',
    price: '€90,000/vit',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Shkoder',
    description: 'Pozicion per inxhinier ndertimi me eksperience ne projekte te medha infrastrukturore.',
    details: {
      company: 'BuildTech',
      experience: '3+ vite',
      education: 'Master ne Inxhinieri Ndertimi',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@buildtech.al',
      publishedDate: '25 Maj, 2025'
    }
  },
  106: {
    id: 106,
    title: 'Financier',
    price: '€70,000/vit',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Tirane',
    description: 'Kerkohet financier per analiza financiare dhe mbeshtetje ne vendimmarrjen strategjike.',
    details: {
      company: 'FinanceHub',
      experience: '2+ vite',
      education: 'Bachelor ne Finance',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@financehub.al',
      publishedDate: '23 Maj, 2025'
    }
  },
  107: {
    id: 107,
    title: 'Web Designer',
    price: '€55,000/vit',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Elbasan',
    description: 'Pozicion per web designer me njohuri ne UI/UX design dhe tools moderne te dizajnit.',
    details: {
      company: 'DesignStudio',
      experience: '1-3 vite',
      education: 'Bachelor ne Dizajn Grafik',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@designstudio.al',
      publishedDate: '21 Maj, 2025'
    }
  },
  108: {
    id: 108,
    title: 'Data Analyst',
    price: '€60,000/vit',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Fier',
    description: 'Kerkohet analist te dhenash per punim me databaza te medha dhe raporte analitike.',
    details: {
      company: 'DataInsights',
      experience: '1-3 vite',
      education: 'Bachelor ne Matematike ose Informatike',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@datainsights.al',
      publishedDate: '19 Maj, 2025'
    }
  },
  109: {
    id: 109,
    title: 'Project Manager',
    price: '€85,000/vit',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Korce',
    description: 'Pozicion per menaxher projektesh me eksperience ne metodologjite agile dhe scrum.',
    details: {
      company: 'ProjectLead',
      experience: '3+ vite',
      education: 'Master ne Menaxhim Projektesh',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@projectlead.al',
      publishedDate: '24 Maj, 2025'
    }
  },
  110: {
    id: 110,
    title: 'Software Engineer',
    price: '€95,000/vit',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    type: 'Pune',
    location: 'Tirane',
    description: 'Kerkohet software engineer me eksperience ne zhvillimin e aplikacioneve full-stack.',
    details: {
      company: 'SoftwarePro',
      experience: '3+ vite',
      education: 'Bachelor ne Informatike',
      schedule: 'Kohe e plote',
      contactEmail: 'jobs@softwarepro.al',
      publishedDate: '26 Maj, 2025'
    }
  },

  // Kategoria Makina (201-210)
  201: {
    id: 201,
    title: 'Mercedes-Benz C-Class 2020',
    price: '€35,000',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Tirane',
    description: 'Mercedes-Benz C-Class 2020 ne gjendje shume te mire, i importuar nga Gjermania. Vetem 45,000 km. I servisuar rregullisht ne servis te autorizuar.',
    details: {
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2020,
      fuel: 'Nafte',
      transmission: 'Automatik',
      kilometers: '45,000 km',
      engineSize: '2.0 L',
      power: '190 HP',
      color: 'E zeze',
      contactPhone: '+355 69 123 4567',
      publishedDate: '20 Maj, 2025'
    }
  },
  202: {
    id: 202,
    title: 'BMW 3 Series 2019',
    price: '€32,000',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Durres',
    description: 'BMW 3 Series 2019 ne gjendje te shkellqyeshme. Makine e perdorur me kujdes, me te gjitha serviset e bera.',
    details: {
      brand: 'BMW',
      model: '3 Series',
      year: 2019,
      fuel: 'Benzine',
      transmission: 'Automatik',
      kilometers: '52,000 km',
      engineSize: '2.0 L',
      power: '184 HP',
      color: 'E bardhe',
      contactPhone: '+355 69 234 5678',
      publishedDate: '22 Maj, 2025'
    }
  },
  203: {
    id: 203,
    title: 'Audi A4 2021',
    price: '€38,000',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Tirane',
    description: 'Audi A4 2021 pothuajse e re, me vetem 25,000 km. E blere ne Shqiperi dhe e mbajtur shume mire.',
    details: {
      brand: 'Audi',
      model: 'A4',
      year: 2021,
      fuel: 'Nafte',
      transmission: 'Automatik',
      kilometers: '25,000 km',
      engineSize: '2.0 L',
      power: '150 HP',
      color: 'Gri',
      contactPhone: '+355 69 345 6789',
      publishedDate: '21 Maj, 2025'
    }
  },
  204: {
    id: 204,
    title: 'Volkswagen Golf 2018',
    price: '€18,000',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Vlore',
    description: 'Volkswagen Golf 2018 ne gjendje te mire, ideale per qytet. Ekonomike dhe e besueshme.',
    details: {
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2018,
      fuel: 'Benzine',
      transmission: 'Manual',
      kilometers: '78,000 km',
      engineSize: '1.4 L',
      power: '125 HP',
      color: 'E kuqe',
      contactPhone: '+355 69 456 7890',
      publishedDate: '19 Maj, 2025'
    }
  },
  205: {
    id: 205,
    title: 'Toyota Corolla 2022',
    price: '€25,000',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Shkoder',
    description: 'Toyota Corolla 2022 ne gjendje te shkellqyeshme, shume ekonomike ne konsum.',
    details: {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      fuel: 'Benzine',
      transmission: 'Automatik',
      kilometers: '15,000 km',
      engineSize: '1.8 L',
      power: '140 HP',
      color: 'E bardhe',
      contactPhone: '+355 69 567 8901',
      publishedDate: '23 Maj, 2025'
    }
  },
  206: {
    id: 206,
    title: 'Tesla Model 3 2023',
    price: '€42,000',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Tirane',
    description: 'Tesla Model 3 2023 elektrike, teknologji e avancuar dhe autonomi e larte.',
    details: {
      brand: 'Tesla',
      model: 'Model 3',
      year: 2023,
      fuel: 'Elektrike',
      transmission: 'Automatik',
      kilometers: '8,000 km',
      engineSize: 'Elektrik',
      power: '283 HP',
      color: 'E zeze',
      contactPhone: '+355 69 678 9012',
      publishedDate: '25 Maj, 2025'
    }
  },
  207: {
    id: 207,
    title: 'Ford Focus 2020',
    price: '€16,500',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Elbasan',
    description: 'Ford Focus 2020 ne gjendje te mire, praktike per perdorim te perditeshem.',
    details: {
      brand: 'Ford',
      model: 'Focus',
      year: 2020,
      fuel: 'Benzine',
      transmission: 'Manual',
      kilometers: '65,000 km',
      engineSize: '1.5 L',
      power: '120 HP',
      color: 'Blu',
      contactPhone: '+355 69 789 0123',
      publishedDate: '18 Maj, 2025'
    }
  },
  208: {
    id: 208,
    title: 'Honda Civic 2019',
    price: '€21,000',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Fier',
    description: 'Honda Civic 2019 shume e besueshme dhe ekonomike ne konsum.',
    details: {
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
      fuel: 'Benzine',
      transmission: 'Automatik',
      kilometers: '58,000 km',
      engineSize: '1.5 L',
      power: '129 HP',
      color: 'Gri',
      contactPhone: '+355 69 890 1234',
      publishedDate: '20 Maj, 2025'
    }
  },
  209: {
    id: 209,
    title: 'Nissan Qashqai 2021',
    price: '€28,000',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Korce',
    description: 'Nissan Qashqai 2021 SUV kompakt, ideal per familje.',
    details: {
      brand: 'Nissan',
      model: 'Qashqai',
      year: 2021,
      fuel: 'Nafte',
      transmission: 'Automatik',
      kilometers: '35,000 km',
      engineSize: '1.5 L',
      power: '115 HP',
      color: 'E bardhe',
      contactPhone: '+355 69 901 2345',
      publishedDate: '24 Maj, 2025'
    }
  },
  210: {
    id: 210,
    title: 'Hyundai Tucson 2022',
    price: '€30,000',
    image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&h=600&fit=crop',
    type: 'Makina',
    location: 'Berat',
    description: 'Hyundai Tucson 2022 SUV modern me teknologji te avancuar.',
    details: {
      brand: 'Hyundai',
      model: 'Tucson',
      year: 2022,
      fuel: 'Nafte',
      transmission: 'Automatik',
      kilometers: '22,000 km',
      engineSize: '1.6 L',
      power: '136 HP',
      color: 'E zeze',
      contactPhone: '+355 69 012 3456',
      publishedDate: '26 Maj, 2025'
    }
  },

  // Kategoria Shtepi (301-310)
  301: {
    id: 301,
    title: 'Apartament 2+1 ne qender',
    price: '€120,000',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Tirane',
    description: 'Apartament i ri 2+1, i pozicionuar ne qender te Tiranes, me pamje te bukur nga qyteti. Mobiluar plotesisht, me material cilesore dhe dizajn modern.',
    details: {
      type: 'Apartament',
      rooms: '2+1',
      area: '85 m²',
      floor: '5 (nga 8)',
      parking: 'Po',
      construction: 'E re (2022)',
      furnished: 'Po, plotesisht',
      energyClass: 'A',
      contactPhone: '+355 69 765 4321',
      publishedDate: '18 Maj, 2025'
    }
  },
  302: {
    id: 302,
    title: 'Ville ne Gjirin e Lalzit',
    price: '€450,000',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Durres',
    description: 'Ville luksoze ne Gjirin e Lalzit me pamje nga deti. Oborr i madh dhe pisine private.',
    details: {
      type: 'Ville',
      rooms: '4+2+2',
      area: '280 m²',
      floor: '2 kate',
      parking: 'Po, per 3 makina',
      construction: 'E re (2023)',
      furnished: 'Po, pjeserisht',
      energyClass: 'A',
      contactPhone: '+355 69 876 5432',
      publishedDate: '22 Maj, 2025'
    }
  },
  303: {
    id: 303,
    title: 'Apartament 3+1 i ri',
    price: '€180,000',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Tirane',
    description: 'Apartament 3+1 i ri ne zonen e Bllokut, me cmim konkurrues.',
    details: {
      type: 'Apartament',
      rooms: '3+1',
      area: '110 m²',
      floor: '7 (nga 10)',
      parking: 'Po',
      construction: 'E re (2023)',
      furnished: 'Jo',
      energyClass: 'A',
      contactPhone: '+355 69 987 6543',
      publishedDate: '19 Maj, 2025'
    }
  },
  304: {
    id: 304,
    title: 'Penthouse me pamje nga deti',
    price: '€250,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Vlore',
    description: 'Penthouse luksoz me pamje panoramike nga deti, tarraca e madhe.',
    details: {
      type: 'Penthouse',
      rooms: '3+1+2',
      area: '150 m²',
      floor: '8 (i fundit)',
      parking: 'Po',
      construction: 'E re (2022)',
      furnished: 'Po, plotesisht',
      energyClass: 'A+',
      contactPhone: '+355 69 098 7654',
      publishedDate: '21 Maj, 2025'
    }
  },
  305: {
    id: 305,
    title: 'Shtepi private 4+1',
    price: '€220,000',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Shkoder',
    description: 'Shtepi private 4+1 me oborr te madh, ideale per familje.',
    details: {
      type: 'Shtepi Private',
      rooms: '4+1',
      area: '200 m²',
      floor: '2 kate',
      parking: 'Po, per 2 makina',
      construction: 'E renovuar (2021)',
      furnished: 'Po, pjeserisht',
      energyClass: 'B',
      contactPhone: '+355 69 109 8765',
      publishedDate: '23 Maj, 2025'
    }
  },
  306: {
    id: 306,
    title: 'Garsoniere e mobiluar',
    price: '€65,000',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Tirane',
    description: 'Garsoniere e vogel por funksionale, e mobiluar komplet.',
    details: {
      type: 'Garsoniere',
      rooms: '1+1',
      area: '35 m²',
      floor: '3 (nga 5)',
      parking: 'Jo',
      construction: 'E renovuar (2020)',
      furnished: 'Po, plotesisht',
      energyClass: 'B',
      contactPhone: '+355 69 210 9876',
      publishedDate: '17 Maj, 2025'
    }
  },
  307: {
    id: 307,
    title: 'Apartament 1+1 modern',
    price: '€85,000',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Elbasan',
    description: 'Apartament 1+1 modern me dizajn te ri dhe teknologji te avancuar.',
    details: {
      type: 'Apartament',
      rooms: '1+1',
      area: '55 m²',
      floor: '4 (nga 6)',
      parking: 'Po',
      construction: 'E re (2023)',
      furnished: 'Jo',
      energyClass: 'A',
      contactPhone: '+355 69 321 0987',
      publishedDate: '20 Maj, 2025'
    }
  },
  308: {
    id: 308,
    title: 'Ville me oborr te madh',
    price: '€380,000',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Fier',
    description: 'Ville e madhe me oborr te gjere, ideale per evente dhe familje te medha.',
    details: {
      type: 'Ville',
      rooms: '5+2+2',
      area: '320 m²',
      floor: '2 kate',
      parking: 'Po, per 4 makina',
      construction: 'E renovuar (2022)',
      furnished: 'Po, pjeserisht',
      energyClass: 'B+',
      contactPhone: '+355 69 432 1098',
      publishedDate: '24 Maj, 2025'
    }
  },
  309: {
    id: 309,
    title: 'Duplex 3+2',
    price: '€195,000',
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Korce',
    description: 'Apartament duplex 3+2 me hapesira te medha dhe dizajn modern.',
    details: {
      type: 'Apartament duplex',
      rooms: '3+2',
      area: '140 m²',
      floor: '6-7 (nga 8)',
      parking: 'Po',
      construction: 'E re (2022)',
      furnished: 'Jo',
      energyClass: 'A',
      contactPhone: '+355 69 543 2109',
      publishedDate: '25 Maj, 2025'
    }
  },
  310: {
    id: 310,
    title: 'Apartament i ri 2+1',
    price: '€135,000',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    type: 'Shtepi',
    location: 'Berat',
    description: 'Apartament 2+1 i ri ne qender te Beratit, me cmim te arsyeshem.',
    details: {
      type: 'Apartament',
      rooms: '2+1',
      area: '75 m²',
      floor: '2 (nga 4)',
      parking: 'Po',
      construction: 'E re (2023)',
      furnished: 'Jo',
      energyClass: 'A',
      contactPhone: '+355 69 654 3210',
      publishedDate: '26 Maj, 2025'
    }
  },

  // Kategoria Qira (401-410)
  401: {
    id: 401,
    title: 'Apartament 1+1 me qira',
    price: '€350/muaj',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Tirane',
    description: 'Apartament modern 1+1 per qira ne zonen e Bllokut. I mobiluar komplet, me pajisje elektroshtepijake te reja. I disponueshem per kontrate afatgjate.',
    details: {
      type: 'Apartament',
      rooms: '1+1',
      area: '55 m²',
      floor: '3 (nga 6)',
      furnished: 'Po, komplet',
      availableFrom: '1 Qershor, 2025',
      deposit: '€350',
      utilities: 'Nuk perfshihen ne cmim',
      pets: 'Jo te lejuara',
      contactPhone: '+355 69 987 6543',
      publishedDate: '19 Maj, 2025'
    }
  },
  402: {
    id: 402,
    title: 'Zyra per biznes',
    price: '€600/muaj',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Durres',
    description: 'Zyra moderne per biznes ne qender te Durresit, me parking te dedikuar.',
    details: {
      type: 'Zyra',
      rooms: '3 dhoma',
      area: '80 m²',
      floor: '2 (nga 4)',
      furnished: 'Po, pjeserisht',
      availableFrom: '15 Qershor, 2025',
      deposit: '€1200',
      utilities: 'Perfshihen ne cmim',
      pets: 'Jo te lejuara',
      contactPhone: '+355 69 123 4567',
      publishedDate: '22 Maj, 2025'
    }
  },
  403: {
    id: 403,
    title: 'Makine BMW me qira',
    price: '€70/dite',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Tirane',
    description: 'BMW 3 Series 2020 per qira, ideale per udhetime biznesi ose pushime.',
    details: {
      brand: 'BMW',
      model: '3 Series',
      year: 2020,
      fuel: 'Benzine',
      transmission: 'Automatik',
      insurance: 'E perfshire',
      minimumAge: '25 vjeç',
      drivingLicense: 'Minimum 2 vite',
      contactPhone: '+355 69 234 5678',
      publishedDate: '20 Maj, 2025'
    }
  },
  404: {
    id: 404,
    title: 'Villa me qira per pushime',
    price: '€200/nate',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Sarande',
    description: 'Villa luksoze me pamje nga deti per qira afatshkurter. Ideale per pushime familjare.',
    details: {
      type: 'Villa',
      rooms: '3+2',
      area: '150 m²',
      guests: 'Deri ne 8 persona',
      amenities: 'Pisine, BBQ, WiFi, Parking',
      minimumStay: '3 net',
      contactPhone: '+355 69 345 6789',
      publishedDate: '21 Maj, 2025'
    }
  },
  405: {
    id: 405,
    title: 'Dyqan ne qender',
    price: '€800/muaj',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Tirane',
    description: 'Dyqan me pozicion te shkellqyer ne qender te Tiranes, ideal per biznes.',
    details: {
      type: 'Dyqan',
      area: '60 m²',
      floor: 'Perdhes',
      frontage: '4 metra',
      parking: 'E kufizuar',
      deposit: '€2400',
      contract: 'Minimum 2 vite',
      contactPhone: '+355 69 456 7890',
      publishedDate: '23 Maj, 2025'
    }
  },
  406: {
    id: 406,
    title: 'Apartament 2+1 qira',
    price: '€450/muaj',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Vlore',
    description: 'Apartament 2+1 i mobiluar prane detit, per qira sezonale ose vjetore.',
    details: {
      type: 'Apartament',
      rooms: '2+1',
      area: '75 m²',
      floor: '2 (nga 4)',
      furnished: 'Po, komplet',
      balcony: 'Po, me pamje nga deti',
      availableFrom: 'Menjehere',
      deposit: '€450',
      contactPhone: '+355 69 567 8901',
      publishedDate: '18 Maj, 2025'
    }
  },
  407: {
    id: 407,
    title: 'Mercedes me qira',
    price: '€90/dite',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Durres',
    description: 'Mercedes-Benz C-Class 2021 per qira, luksoz dhe komfort te larte.',
    details: {
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2021,
      fuel: 'Nafte',
      transmission: 'Automatik',
      insurance: 'E perfshire',
      gps: 'Po',
      delivery: 'E mundur',
      contactPhone: '+355 69 678 9012',
      publishedDate: '24 Maj, 2025'
    }
  },
  408: {
    id: 408,
    title: 'Zyre moderne',
    price: '€750/muaj',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Tirane',
    description: 'Zyre moderne ne ndertese te re, me pamje panoramike nga qyteti.',
    details: {
      type: 'Zyre',
      rooms: '4 dhoma + salle takimesh',
      area: '120 m²',
      floor: '12 (nga 15)',
      parking: 'Po, e garantuar',
      internet: 'Fiber optik i perfshire',
      airConditioning: 'Po',
      contactPhone: '+355 69 789 0123',
      publishedDate: '25 Maj, 2025'
    }
  },
  409: {
    id: 409,
    title: 'Toyota me qira',
    price: '€45/dite',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Shkoder',
    description: 'Toyota Corolla 2022 ekonomike per qira, ideale per qytet.',
    details: {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      fuel: 'Benzine',
      transmission: 'Automatik',
      consumption: '5.5L/100km',
      insurance: 'E perfshire',
      roadAssistance: 'Po',
      contactPhone: '+355 69 890 1234',
      publishedDate: '26 Maj, 2025'
    }
  },
  410: {
    id: 410,
    title: 'Penthouse qira luksoze',
    price: '€1200/muaj',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    type: 'Qira',
    location: 'Tirane',
    description: 'Penthouse luksoz ne Sky Tower, me pamje 360 grade nga qyteti.',
    details: {
      type: 'Penthouse',
      rooms: '3+2+2',
      area: '180 m²',
      floor: '20 (i fundit)',
      terrace: '60 m²',
      furnished: 'Po, plotesisht mobiluar',
      amenities: 'Gym, Spa, Concierge',
      parking: 'Po, 2 vende',
      contactPhone: '+355 69 901 2345',
      publishedDate: '17 Maj, 2025'
    }
  }
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const foundListing = demoListingDetails[parseInt(id)];
      if (foundListing) {
        setListing(foundListing);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Shpallja nuk u gjet</h2>
            <p className="text-gray-600 mb-8">Shpallja që kërkoni nuk ekziston ose është hequr.</p>
            <Link 
              to="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Kthehu në faqen kryesore
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderJobDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te punes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600"><strong>Kompania:</strong> {listing.details.company}</p>
          <p className="text-gray-600"><strong>Eksperienca:</strong> {listing.details.experience}</p>
          <p className="text-gray-600"><strong>Arsimi:</strong> {listing.details.education}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Orari:</strong> {listing.details.schedule}</p>
          <p className="text-gray-600"><strong>Email:</strong> {listing.details.contactEmail}</p>
          <p className="text-gray-600"><strong>Data e publikimit:</strong> {listing.details.publishedDate}</p>
        </div>
      </div>
    </div>
  );

  const renderCarDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Specifikime teknike</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600"><strong>Marka:</strong> {listing.details.brand}</p>
          <p className="text-gray-600"><strong>Modeli:</strong> {listing.details.model}</p>
          <p className="text-gray-600"><strong>Viti:</strong> {listing.details.year}</p>
          <p className="text-gray-600"><strong>Karburanti:</strong> {listing.details.fuel}</p>
          <p className="text-gray-600"><strong>Kilometra:</strong> {listing.details.kilometers}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Transmisioni:</strong> {listing.details.transmission}</p>
          <p className="text-gray-600"><strong>Madhesite e motorit:</strong> {listing.details.engineSize}</p>
          <p className="text-gray-600"><strong>Fuqia:</strong> {listing.details.power}</p>
          <p className="text-gray-600"><strong>Ngjyra:</strong> {listing.details.color}</p>
          <p className="text-gray-600"><strong>Telefon:</strong> {listing.details.contactPhone}</p>
        </div>
      </div>
    </div>
  );

  const renderHouseDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te prones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600"><strong>Tipi:</strong> {listing.details.type}</p>
          <p className="text-gray-600"><strong>Dhoma:</strong> {listing.details.rooms}</p>
          <p className="text-gray-600"><strong>Siperfaqja:</strong> {listing.details.area}</p>
          <p className="text-gray-600"><strong>Kati:</strong> {listing.details.floor}</p>
        </div>
        <div>
          <p className="text-gray-600"><strong>Parking:</strong> {listing.details.parking}</p>
          <p className="text-gray-600"><strong>Ndertimi:</strong> {listing.details.construction}</p>
          <p className="text-gray-600"><strong>E mobiluar:</strong> {listing.details.furnished}</p>
          <p className="text-gray-600"><strong>Klasa energjetike:</strong> {listing.details.energyClass}</p>
        </div>
      </div>
    </div>
  );

  const renderRentalDetails = () => {
    if (listing.details.brand) {
      // Car rental
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te qirase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><strong>Marka:</strong> {listing.details.brand}</p>
              <p className="text-gray-600"><strong>Modeli:</strong> {listing.details.model}</p>
              <p className="text-gray-600"><strong>Viti:</strong> {listing.details.year}</p>
              <p className="text-gray-600"><strong>Karburanti:</strong> {listing.details.fuel}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Transmisioni:</strong> {listing.details.transmission}</p>
              <p className="text-gray-600"><strong>Sigurimi:</strong> {listing.details.insurance}</p>
              <p className="text-gray-600"><strong>Mosha minimale:</strong> {listing.details.minimumAge || 'N/A'}</p>
              <p className="text-gray-600"><strong>Telefon:</strong> {listing.details.contactPhone}</p>
            </div>
          </div>
        </div>
      );
    } else {
      // Property rental
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Detaje te qirase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><strong>Tipi:</strong> {listing.details.type}</p>
              <p className="text-gray-600"><strong>Dhoma:</strong> {listing.details.rooms}</p>
              <p className="text-gray-600"><strong>Siperfaqja:</strong> {listing.details.area}</p>
              <p className="text-gray-600"><strong>E mobiluar:</strong> {listing.details.furnished}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>I disponueshem nga:</strong> {listing.details.availableFrom}</p>
              <p className="text-gray-600"><strong>Depozita:</strong> {listing.details.deposit}</p>
              <p className="text-gray-600"><strong>Sherbimet:</strong> {listing.details.utilities || 'N/A'}</p>
              <p className="text-gray-600"><strong>Telefon:</strong> {listing.details.contactPhone}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Kryesore</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{listing.type}</span>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-500 truncate">{listing.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img 
                src={listing.image} 
                alt={listing.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Title and Price */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                  {listing.title}
                </h1>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">
                    {listing.price}
                  </p>
                  <p className="text-gray-600">{listing.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {listing.type}
                </span>
                <span className="text-gray-500 text-sm ml-4">
                  Publikuar: {listing.details.publishedDate}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Pershkrimi</h3>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* Details based on type */}
            {listing.type === 'Pune' && renderJobDetails()}
            {listing.type === 'Makina' && renderCarDetails()}
            {listing.type === 'Shtepi' && renderHouseDetails()}
            {listing.type === 'Qira' && renderRentalDetails()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Kontakt</h3>
              
              {listing.type === 'Pune' && (
                <div>
                  <p className="text-gray-600 mb-4">Apliko per kete pozicion:</p>
                  <a 
                    href={`mailto:${listing.details.contactEmail}`}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 block text-center mb-3"
                  >
                    Dergo CV
                  </a>
                  <p className="text-sm text-gray-500 text-center">
                    Email: {listing.details.contactEmail}
                  </p>
                </div>
              )}

              {(listing.type === 'Makina' || listing.type === 'Shtepi' || listing.type === 'Qira') && (
                <div>
                  <p className="text-gray-600 mb-4">Kontakto shitesin:</p>
                  
                  {/* Butoni i shportes */}
                  <div className="mb-4">
                    <AddToCartButton 
                      item={listing} 
                      className="w-full h-12 rounded-lg text-base font-medium"
                    />
                  </div>
                  
                  <a 
                    href={`tel:${listing.details.contactPhone}`}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 block text-center mb-3"
                  >
                    Telefono
                  </a>
                  <button 
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-3"
                    onClick={() => alert('Mesazh i derguar!')}
                  >
                    Dergo mesazh
                  </button>
                  <p className="text-sm text-gray-500 text-center">
                    Tel: {listing.details.contactPhone}
                  </p>
                </div>
              )}

              {/* Share buttons */}
              <div className="pt-4 border-t mt-4">
                <p className="text-sm text-gray-600 mb-2">Shperndaje:</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition duration-300">
                    Facebook
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition duration-300">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Keshilla sigurie</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Mos paguaj perpara se te shohesh produktin</li>
                <li>• Takohu ne vende publike</li>
                <li>• Kontrollo dokumentet e produktit</li>
                <li>• Beso instinktit tend</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingDetails;