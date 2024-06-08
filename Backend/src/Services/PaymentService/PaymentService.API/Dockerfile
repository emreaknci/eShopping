#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/PaymentService/PaymentService.API/PaymentService.API.csproj", "src/Services/PaymentService/PaymentService.API/"]
COPY ["src/BuildingBlocks/EventBus.MassTransit/EventBus.MassTransit/EventBus.MassTransit.csproj", "src/BuildingBlocks/EventBus.MassTransit/EventBus.MassTransit/"]
RUN dotnet restore "./src/Services/PaymentService/PaymentService.API/PaymentService.API.csproj"
COPY . .
WORKDIR "/src/src/Services/PaymentService/PaymentService.API"
RUN dotnet build "./PaymentService.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PaymentService.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PaymentService.API.dll"]