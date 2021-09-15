FROM --platform=${BUILDPLATFORM} \
    mcr.microsoft.com/dotnet/sdk:5.0.202 AS build-env
WORKDIR /app

RUN apt-get update; apt-get install git

COPY . ./
RUN dotnet build Ansu.Bot/Ansu.Bot.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/runtime:5.0.5-alpine3.13
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Ansu.Bot.dll"]
