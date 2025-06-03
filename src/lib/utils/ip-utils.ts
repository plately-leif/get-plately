export interface IPInfo {
  ip: string;
  country?: string;
  region?: string;
  city?: string;
}

export async function getIPInfo(): Promise<IPInfo | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Failed to fetch IP info');
    return await response.json();
  } catch (error) {
    console.error('Error getting IP info:', error);
    return null;
  }
}
