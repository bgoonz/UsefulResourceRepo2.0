async verifyToken(token) {
        if (token) {
          const decodedToken = jwt.decode(token, { complete: true })

          if (!decodedToken) {return undefined}
          const jwks = await this.getJWKS()

          const jwk = jwks.keys[0]

          let cert = jwk.x5c[0]

          cert = cert.match(/.{1,64}/g).join('\n');

          cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`

          if (jwk.kid === decodedToken.header.kid) {
            try {
              const verifiedToken = jwt.verify(token, cert)

              const expiresAt = verifiedToken.exp * 1000;

              return (verifiedToken && new Date().getTime() < expiresAt ? verifiedToken : undefined)
            } catch (err) {
              return undefined
            }
          }
        }

        return undefined
      }