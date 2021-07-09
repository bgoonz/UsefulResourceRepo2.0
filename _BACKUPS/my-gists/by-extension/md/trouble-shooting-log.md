# Trouble Shooting

---

### 1.)     VScode unable to save files inside my WSL2 home folder

#### soln:

```bash
sudo chown -R bryan ./
```

---

### 2.)     

>npm ERR! code EAI_AGAIN
>npm ERR! syscall getaddrinfo
>npm ERR! errno EAI_AGAIN
>npm ERR! request to https://registry.npmjs.org/npm-check-updates failed, reason: getaddrinfo EAI_AGAIN registry.npmjs.org




```sh
npm config rm proxy 
npm config rm https-proxy --tried removing npm proxy 

```

## [ERR EAI AGAIN](https://stackoverflow.com/questions/63010779/npm-err-code-eai-again-error-when-trying-to-install-express)

