export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    image_url: string;
    category: string;
    brand: string;
    rating: number;
    review_count: number;
    stock: number;
    created_at: string;
}

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image_url: string;
    category: string;
    brand: string;
    quantity: number;
}


export const CATEGORIES = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Sports',
]

export const BRANDS = [
    'SoundPro', 'TechBook', 'Nexus', 'KeyMaster', 'ActionCam',
    'SwiftStride', 'DenimCo', 'WoolCraft', 'TravelPro', 'TimeCraft',
    'TechPress', 'MindPress', 'DesignBooks', 'HabitPress',
    'BrewMaster', 'PureAir', 'IronChef', 'GreenHome',
    'ZenFit', 'IronFlex', 'FitTrack',
]

export const PRICE_RANGES = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 – $100', min: 50, max: 100 },
    { label: '$100 – $300', min: 100, max: 300 },
    { label: '$300 – $500', min: 300, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity },
]