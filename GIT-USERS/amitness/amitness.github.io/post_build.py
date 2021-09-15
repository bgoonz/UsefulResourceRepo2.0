import os

import requests


def purge_cloudflare_cache():
    zone_id = os.getenv("CLOUDFLARE_ZONE_ID")
    cloudflare_token = os.getenv("CLOUDFLARE_TOKEN")
    url = "https://api.cloudflare.com/client/v4/zones/{}/purge_cache".format(zone_id)

    payload = '{"purge_everything":true}'

    headers = {
        "Authorization": "Bearer {}".format(cloudflare_token),
        "Content-Type": "application/json",
    }

    response = requests.request("POST", url, data=payload, headers=headers)
    assert response.json()["success"], "Failed to clear cache"


if __name__ == "__main__":
    purge_cloudflare_cache()
