---
title: "Using custom domains"
order: 105
page_id: "custom_doc_domains"
contextual_links:
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Imgur"
    url: "https://www.postman.com/case-studies/imgur/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Publishing your docs"
    url: "/docs/publishing-your-api/publishing-your-docs/"

warning: false
---

> __[Custom documentation domains are available on Postman Team, Business, and Enterprise plans.](https://www.postman.com/pricing)__

You can use a custom domain for your API documentation.

## Adding a custom domain

In the Postman web dashboard, select [Team Settings](https://go.postman.co/settings/team/general) from the Team tab.

[![edit view for team](https://assets.postman.com/postman-docs/edit-team-profile-a.jpg)](https://assets.postman.com/postman-docs/edit-team-profile-a.jpg)

In the __Custom Domains__ section, you will see a list of domains indicated with verification status. Click __+ Add a new domain__.

[![custom domain](https://assets.postman.com/postman-docs/add-custom-domain.jpg)](https://assets.postman.com/postman-docs/add-custom-domain.jpg)

In the __Add a Custom Domain__ page, enter the URL of the domain you want to add. Your custom domain can be a full domain or a subdomain. For example, you can use either `example.com` or `api.example.com`.

[![enter custom domain](https://assets.postman.com/postman-docs/add-custom-domain-1.jpg)](https://assets.postman.com/postman-docs/add-custom-domain-1.jpg)

Click __Proceed__ to verify the domain.

## Verifying your domain

When you add a custom domain, you will see a modal displaying the DNS records required to verify domain ownership. To verify that you control the domain you're attempting to add, you must add these provided tokens as DNS records to your domain for TXT and CNAME.

[![see TXT and CNAME](https://assets.postman.com/postman-docs/verfication-tokens-1.jpg)](https://assets.postman.com/postman-docs/verfication-tokens-1.jpg)

## Adding DNS records

For DNS records, verify the ownership with a DNS web service provider. In a separate browser tab, go to the DNS provider’s console and add the following two new records.

1. A TXT record for `postman-echo.com` verifies the ownership of the domain. The value should be the same as the token shown in the modal. Add the TXT record to the __root domain__. For example if you're adding `example.com` or `api.example.com`, add the TXT record to `example.com`.
2. A CNAME record for `docs.postman-echo.com`, as shown in the modal—this should be `phs.getpostman.com`. Add the CNAME record to the URL that's associated with your public documentation.

To verify the domain, check the __I've added the TXT and CNAME records__ checkbox, then click __Verify Domain__. A confirmation message should indicate that the domain has been verified.

[![verify_domain](https://assets.postman.com/postman-docs/docs-verify-domain-1.jpg)](https://assets.postman.com/postman-docs/docs-verify-domain-1.jpg)

> Postman uses LetsEncrypt as an SSL certificate provider to enable hosting public documentation on your domain. LetsEncrypt generates a certificate implicitly if your domain has no CAA records. If your domain has CAA records set, then LetsEncrypt needs an explicit CAA record to issue a certificate for that domain. To enable LetsEncrypt issue this certificate, refer to the [LetsEncrypt Documentation](https://letsencrypt.org/docs/caa/).

If you don't want to verify the domain now, click __Verify Later__.

You can remove the custom domain by clicking __Delete Custom Domain__.

> Your DNS settings may take up to 24 hours to take effect, and you may receive an error message in the interim. To check the status, you can visit [this website](https://www.whatsmydns.net/).

## Troubleshooting DNS issues

If you receive the error message

```
RRSet of type CNAME with DNS name <subdomain.domain.com> is not permitted as it conflicts with other records with the same DNS name in zone <domain.com>
```

when adding your first domain, note that CNAME records cannot co-exist with any other records for a domain. You will need to either edit the existing record type for your subdomain to CNAME or add a new subdomain.

If you receive the same message when adding your second domain, note that since the TXT record verifies the ownership of the domain, the value should be the same as the token already added for the root domain. Add the CNAME record to the URL that's associated with your public documentation, for which the value should be `phs.getpostman.com`.

## Publishing a collection on your custom domain

When your domain is verified, you can use it to [publish your API documentation](/docs/publishing-your-api/publishing-your-docs/). If you have a collection already published, you can edit it to use the new domain.

[![publish collection](https://assets.postman.com/postman-docs/publish-collection-edit-1.jpg)](https://assets.postman.com/postman-docs/publish-collection-edit-1.jpg)
