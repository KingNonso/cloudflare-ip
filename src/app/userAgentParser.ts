interface IpApiResponse {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  postal: string;
  org: string;
}

export interface ParsedIpDetails {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  postal: string;
  org: string;
}

export async function parseIpAddress(ip: string): Promise<ParsedIpDetails | null> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      console.error('Error fetching IP details:', response.statusText);
      return null;
    }

    const data: IpApiResponse = await response.json();
    
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country_name: data.country_name,
      postal: data.postal,
      org: data.org,
    };
  } catch (error) {
    console.error('Error parsing IP address:', error);
    return null;
  }
}
