import { products, Product } from './data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchProducts(params?: { category?: string; sort?: string; page?: number; filters?: Record<string, unknown> }) {
  await delay(600);
  let filtered = [...products];
  if (params?.category && params.category !== 'all') {
    filtered = filtered.filter(p => p.category === params.category);
  }
  if (params?.sort) {
    switch (params.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        break;
    }
  }
  return { data: filtered, total: filtered.length };
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(400);
  return products.find(p => p.id === id) || null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(300);
  return products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
}

// Mock authentication
export async function login(email: string, password: string) {
  await delay(800);
  if (email === 'demo@luxe.com' && password === 'password') {
    return { user: { name: 'Alexandra', email }, token: 'mock-jwt' };
  }
  throw new Error('Invalid credentials');
}

export async function register(data: { name: string; email: string; password: string }) {
  await delay(800);
  return { user: { name: data.name, email: data.email }, token: 'mock-jwt' };
}
