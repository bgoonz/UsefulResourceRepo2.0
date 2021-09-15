type ParsedHost = {
  subdomain?: string | null;
  domain: string;
  port: number | null;
};

export const parseHost = (host?: string): ParsedHost => {
  if (!host) throw new Error(`Missing host string`);

  const [hostname, port] = host.split(":");
  const parts = hostname.split(".");
  const isSubdomain = parts.length === 3;

  const [subdomain, sld, tld] = isSubdomain ? parts : [null, ...parts];

  return {
    subdomain,
    domain: [sld, tld].filter(Boolean).join("."),
    port: port ? Number(port) : null,
  };
};
