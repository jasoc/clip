FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine3.18-amd64
RUN dotnet tool install -g Badgie.Migrator
WORKDIR /migrations
COPY ./*.sql ./