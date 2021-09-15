if [ ! -f ./.env.development.local ]; then
  cp .env.development .env.development.local
fi

if [ ! -f ./.env.production.local ]; then
  cp .env.production .env.production.local
fi