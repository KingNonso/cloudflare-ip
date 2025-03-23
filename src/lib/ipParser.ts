type IpDetails = {
  ip: string;
  city?: string;
  region?: string;
  country_name?: string;
  postal?: string;
  org?: string;
  error?: string;
};

const cache = new Map<string, { data: IpDetails; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 hour

export async function getIpDetails(ip: string): Promise<IpDetails> {
  const now = Date.now();
  const cached = cache.get(ip);
  
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'IP Details App/1.0' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    cache.set(ip, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error(`Error fetching IP details for ${ip}:`, error);
    return { ip, error: 'Could not fetch IP details' };
  }
}
