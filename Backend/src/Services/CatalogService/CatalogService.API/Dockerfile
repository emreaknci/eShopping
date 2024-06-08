FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5004

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/CatalogService/CatalogService.API/CatalogService.API.csproj", "src/Services/CatalogService/CatalogService.API/"]
COPY ["src/BuildingBlocks/EventBus.MassTransit/EventBus.MassTransit/EventBus.MassTransit.csproj", "src/BuildingBlocks/EventBus.MassTransit/EventBus.MassTransit/"]
RUN dotnet restore "./src/Services/CatalogService/CatalogService.API/CatalogService.API.csproj"
COPY . .
WORKDIR "/src/src/Services/CatalogService/CatalogService.API"
RUN dotnet build "./CatalogService.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CatalogService.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

#RUN mkdir -p wwwroot/Images
#
#RUN chmod -R 777 /app/wwwroot/Images
#VOLUME /app/images
#
ENTRYPOINT ["dotnet", "CatalogService.API.dll"]
