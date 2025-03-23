import { headers } from "next/headers";

async function getIpDetails() {
  const headersList = await headers();
  const clientIP = headersList.get("x-client-ip") || "Unknown";
  const cfIP = headersList.get("x-cf-ip") || "Unknown";

  let ipToCheck = cfIP !== "Unknown" ? cfIP : clientIP;

  try {
    const response = await fetch(`https://ipapi.co/${ipToCheck}/json/`);
    const data = await response.json();
    return {
      ...data,
      clientIP,
      cfIP,
    };
  } catch (error) {
    console.error("Error fetching IP details:", error);
    return { error: "Could not fetch IP details", clientIP, cfIP };
  }
}

export default async function Home() {
  const ipDetails = await getIpDetails();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left">
            <li className="mb-2 tracking-[-.01em]">
              Your IP details:{" "}
              <div className="mt-2 space-y-1">
                <code className="block bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  Client IP: {ipDetails.clientIP}
                </code>
                <code className="block bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  Cloudflare IP: {ipDetails.cfIP}
                </code>
                <code className="block bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  IP: {ipDetails.ip} ({ipDetails.version})
                </code>
                <code className="block bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  Location: {ipDetails.city}, {ipDetails.region}, {ipDetails.country_name}
                </code>
                <code className="block bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  ISP: {ipDetails.org}
                </code>
              </div>
            </li>
        </ol>
      </main>
    </div>
  );
}
