FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /app
COPY . .
EXPOSE 5000
RUN dotnet build Clip.Server.csproj --configuration Release --runtime linux-x64 --no-self-contained
ENTRYPOINT ["dotnet", "bin/Release/net7.0/linux-x64/Clip.Server.dll"]
