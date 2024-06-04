using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CatalogService.API.Migrations
{
    /// <inheritdoc />
    public partial class mig_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    ParentCategoryId = table.Column<int>(type: "integer", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentCategoryId",
                        column: x => x.ParentCategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    UnitsInStock = table.Column<int>(type: "integer", nullable: false),
                    BrandId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BrandCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BrandId = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrandCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BrandCategories_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BrandCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    FeatureId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CategoryFeatures_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryFeatures_Features_FeatureId",
                        column: x => x.FeatureId,
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FeatureValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FeatureId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeatureValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeatureValues_Features_FeatureId",
                        column: x => x.FeatureId,
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductCategories_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    IsCoverImage = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductImages_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    FeatureValueId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductFeatures_FeatureValues_FeatureValueId",
                        column: x => x.FeatureValueId,
                        principalTable: "FeatureValues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductFeatures_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Brands",
                columns: new[] { "Id", "CreatedDate", "IsDeleted", "Name", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4760), false, "APPLE", true, null },
                    { 2, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4770), false, "SAMSUNG", true, null },
                    { 3, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4771), false, "HUAWEI", true, null },
                    { 4, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4773), false, "XIAOMİ", true, null },
                    { 5, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4774), false, "OPPO", true, null },
                    { 6, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4775), false, "VESTEL", true, null },
                    { 7, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4776), false, "ASUS", true, null },
                    { 8, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4777), false, "LENOVO", true, null },
                    { 9, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4778), false, "HP", true, null },
                    { 10, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4779), false, "MONSTER", true, null },
                    { 11, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4780), false, "LOGITECH", true, null },
                    { 12, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4780), false, "JBL", true, null },
                    { 13, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4781), false, "SENNHEISER", true, null },
                    { 14, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4782), false, "SEAGATE", true, null },
                    { 15, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4783), false, "WD", true, null },
                    { 16, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4783), false, "KINGSTON", true, null },
                    { 17, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4784), false, "CRUCIAL", true, null },
                    { 18, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4786), false, "ACER", true, null },
                    { 19, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4786), false, "MSI", true, null },
                    { 20, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4787), false, "CASPER", true, null },
                    { 21, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4788), false, "TCL", true, null },
                    { 22, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4789), false, "PHILIPS", true, null },
                    { 23, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4789), false, "LG", true, null },
                    { 24, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4790), false, "Sony SONY", true, null },
                    { 25, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4791), false, "CANON", true, null },
                    { 26, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4792), false, "AMD", true, null },
                    { 27, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4792), false, "INTEL", true, null },
                    { 28, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4793), false, "NVIDIA", true, null },
                    { 29, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4794), false, "GIGABYTE", true, null },
                    { 30, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4795), false, "CORSAIR", true, null },
                    { 31, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4796), false, "GSKILL", true, null },
                    { 32, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4796), false, "RAMPAGE", true, null },
                    { 33, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4797), false, "STEELSERIES", true, null },
                    { 34, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4798), false, "RAZER", true, null },
                    { 35, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4799), false, "DELL", true, null },
                    { 36, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4800), false, "THERMALTAKE", true, null },
                    { 37, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4801), false, "COOLER MASTER", true, null },
                    { 38, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4802), false, "DEEPCOOL", true, null },
                    { 39, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4802), false, "JWIN", true, null },
                    { 40, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4803), false, "ANKER", true, null },
                    { 41, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4804), false, "ARZUM", true, null },
                    { 42, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4805), false, "BOSCH", true, null },
                    { 44, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4806), false, "ARCELIK", true, null },
                    { 45, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4806), false, "BEKO", true, null },
                    { 46, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4807), false, "FAKIR", true, null },
                    { 47, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4808), false, "BRAUN", true, null },
                    { 48, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4830), false, "ADDISON", true, null },
                    { 49, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4831), false, "CELLURLARLINE", true, null },
                    { 50, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4832), false, "NIKON", true, null }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedDate", "IsDeleted", "Name", "ParentCategoryId", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4882), false, "Telefon", null, true, null },
                    { 2, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4890), false, "Bilgisayar", null, true, null },
                    { 3, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4891), false, "Tv, Görüntü ve Ses", null, true, null },
                    { 4, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4893), false, "Bilgisayar Parçaları", null, true, null },
                    { 5, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4895), false, "Aksesusar", null, true, null }
                });

            migrationBuilder.InsertData(
                table: "Features",
                columns: new[] { "Id", "CreatedDate", "IsDeleted", "Name", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(4440), false, "Dahili Hafıza (Mobil)", true, null },
                    { 2, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5482), false, "Ekran Boyutu Aralığı", true, null },
                    { 3, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5487), false, "RAM Boyutu (Mobil)", true, null },
                    { 4, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5489), false, "Kamera Çözünürlüğü", true, null },
                    { 5, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5490), false, "Ekran Yenileme Hızı", true, null },
                    { 6, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5516), false, "Batarya", true, null },
                    { 7, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5518), false, "İşletim Sistemi (Mobil)", true, null },
                    { 8, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5518), false, "İşlemci", true, null },
                    { 9, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5519), false, "Ekran Kartı", true, null },
                    { 10, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5521), false, "Dahili Hafıza (Bilgisayar)", true, null },
                    { 11, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5523), false, "RAM Boyutu (Bilgisayar)", true, null },
                    { 12, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5524), false, "İşletim Sistemi (Bilgisayar)", true, null },
                    { 13, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5524), false, "Ekran Boyutu (Bilgisayar)", true, null },
                    { 14, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5525), false, "Aydınlatmalı Klavye", true, null },
                    { 15, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5526), false, "Çözünürlük (Piksel)", true, null },
                    { 16, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5527), false, "Ekran Boyutu (TV)", true, null },
                    { 17, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5528), false, "Ekran Tipi", true, null },
                    { 18, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5530), false, "Çözünürlük (TV)", true, null },
                    { 19, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5531), false, "RAM Tipi", true, null },
                    { 20, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5532), false, "RAM Slot Sayısı", true, null },
                    { 21, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5533), false, "Bluetooth Desteği", true, null },
                    { 22, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5534), false, "Güç Değeri", true, null },
                    { 23, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5535), false, "Kapasite (SSD)", true, null },
                    { 24, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5536), false, "Okuma Hızı", true, null },
                    { 25, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5537), false, "Yazma Hızı", true, null },
                    { 26, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5538), false, "Ram Kapasitesi", true, null },
                    { 28, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5539), false, "Ram Hızı", true, null },
                    { 31, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5540), false, "İşlemci Hızı", true, null },
                    { 32, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5541), false, "İşlemci Çekirdek Sayısı", true, null },
                    { 33, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5542), false, "Kablosuz Şarj", true, null },
                    { 34, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5542), false, "Renk", true, null },
                    { 35, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5543), false, "Kapasite (Powerbank)", true, null },
                    { 36, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5544), false, "Laptop Boyut Aralığı", true, null }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedDate", "IsDeleted", "Name", "ParentCategoryId", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 6, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4896), false, "Notebook", 2, true, null },
                    { 7, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4898), false, "Masaüstü Bilgisayar", 2, true, null },
                    { 8, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4899), false, "Tabletler", 2, true, null },
                    { 9, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4901), false, "Monitörler", 2, true, null },
                    { 10, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4902), false, "Televizyonlar", 3, true, null },
                    { 11, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4904), false, "Projeksiyonlar", 3, true, null },
                    { 12, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4905), false, "Kulaklık", 3, true, null },
                    { 13, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4906), false, "Anakart", 4, true, null },
                    { 14, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4908), false, "Ekran Kartları", 4, true, null },
                    { 15, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4909), false, "Güç Kaynakları", 4, true, null },
                    { 16, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4910), false, "İşlemciler", 4, true, null },
                    { 17, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4911), false, "Ram", 4, true, null },
                    { 18, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4913), false, "SSD", 4, true, null },
                    { 19, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4914), false, "Powerbank", 5, true, null },
                    { 20, new DateTime(2024, 6, 4, 10, 54, 37, 901, DateTimeKind.Utc).AddTicks(4936), false, "Laptop Çantaları", 5, true, null }
                });

            migrationBuilder.InsertData(
                table: "CategoryFeatures",
                columns: new[] { "Id", "CategoryId", "CreatedDate", "FeatureId", "IsDeleted", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(5767), 1, false, true, null },
                    { 2, 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6027), 2, false, true, null },
                    { 3, 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6028), 3, false, true, null },
                    { 4, 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6029), 4, false, true, null },
                    { 5, 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6029), 5, false, true, null },
                    { 6, 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6032), 6, false, true, null },
                    { 7, 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6033), 7, false, true, null },
                    { 8, 2, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6033), 8, false, true, null },
                    { 9, 2, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6034), 9, false, true, null },
                    { 10, 2, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6035), 10, false, true, null },
                    { 11, 2, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6036), 11, false, true, null },
                    { 12, 2, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6036), 12, false, true, null }
                });

            migrationBuilder.InsertData(
                table: "FeatureValues",
                columns: new[] { "Id", "CreatedDate", "FeatureId", "IsDeleted", "Status", "UpdatedDate", "Value" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6282), 1, false, true, null, "16 GB" },
                    { 2, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6529), 1, false, true, null, "32 GB" },
                    { 3, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6546), 1, false, true, null, "64 GB" },
                    { 4, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6547), 1, false, true, null, "128 GB" },
                    { 5, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6548), 1, false, true, null, "256 GB" },
                    { 6, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6550), 1, false, true, null, "512 GB" },
                    { 7, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6551), 1, false, true, null, "1 TB" },
                    { 8, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6551), 2, false, true, null, "5.1 Inch - 6.00 Inch" },
                    { 9, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6552), 2, false, true, null, "6.1 Inch - 6.5 Inch" },
                    { 10, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6553), 2, false, true, null, "6.5+ Inch" },
                    { 11, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6554), 3, false, true, null, "2 GB" },
                    { 12, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6555), 3, false, true, null, "3 GB" },
                    { 13, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6555), 3, false, true, null, "4 GB" },
                    { 14, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6556), 3, false, true, null, "6 GB" },
                    { 15, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6557), 3, false, true, null, "8 GB" },
                    { 16, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6558), 3, false, true, null, "12 GB" },
                    { 17, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6558), 3, false, true, null, "16 GB" },
                    { 18, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6559), 4, false, true, null, "12 MP" },
                    { 19, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6560), 4, false, true, null, "16 MP" },
                    { 20, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6561), 4, false, true, null, "20 MP" },
                    { 21, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6562), 4, false, true, null, "24 MP" },
                    { 22, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6562), 4, false, true, null, "32 MP" },
                    { 23, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6563), 4, false, true, null, "48+ MP" },
                    { 24, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6564), 5, false, true, null, "60 Hz" },
                    { 25, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6564), 5, false, true, null, "90 Hz" },
                    { 26, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6565), 5, false, true, null, "120 Hz" },
                    { 27, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6566), 6, false, true, null, "3000 mAh" },
                    { 28, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6567), 6, false, true, null, "4000 mAh" },
                    { 29, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6567), 6, false, true, null, "5000 mAh" },
                    { 30, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6568), 6, false, true, null, "6000 mAh" },
                    { 31, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6569), 6, false, true, null, "7000 mAh" },
                    { 32, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6569), 7, false, true, null, "Android" },
                    { 33, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6570), 7, false, true, null, "IOS" },
                    { 34, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6572), 8, false, true, null, "AMD Ryzen 3" },
                    { 35, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6580), 8, false, true, null, "AMD Ryzen 5" },
                    { 36, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6580), 8, false, true, null, "AMD Ryzen 7" },
                    { 37, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6581), 8, false, true, null, "AMD Ryzen 9" },
                    { 38, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6582), 8, false, true, null, "Intel Core i3" },
                    { 39, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6582), 8, false, true, null, "Intel Core i5" },
                    { 40, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6583), 8, false, true, null, "Intel Core i7" },
                    { 41, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6584), 8, false, true, null, "Intel Core i9" },
                    { 42, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6585), 8, false, true, null, "Intel Xeon" },
                    { 43, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6585), 8, false, true, null, "Intel Pentium" },
                    { 44, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6586), 8, false, true, null, "Intel Celeron" },
                    { 45, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6587), 8, false, true, null, "Intel Atom" },
                    { 46, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6587), 9, false, true, null, "AMD Radeon RX 550" },
                    { 47, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6588), 9, false, true, null, "AMD Radeon RX 560" },
                    { 48, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6589), 9, false, true, null, "AMD Radeon RX 570" },
                    { 49, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6590), 9, false, true, null, "AMD Radeon RX 580" },
                    { 50, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6590), 9, false, true, null, "AMD Radeon RX 590" },
                    { 51, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6591), 9, false, true, null, "AMD Radeon RX 5500 XT" },
                    { 52, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6592), 9, false, true, null, "AMD Radeon RX 5600 XT" },
                    { 53, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6592), 9, false, true, null, "AMD Radeon RX 5700 XT" },
                    { 54, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6593), 9, false, true, null, "AMD Radeon RX 6800 XT" },
                    { 55, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6594), 9, false, true, null, "AMD Radeon RX 6900 XT" },
                    { 56, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6595), 9, false, true, null, "Nvidia GeForce GT 710" },
                    { 57, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6595), 9, false, true, null, "Nvidia GeForce GT 730" },
                    { 58, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6596), 9, false, true, null, "Nvidia GeForce GT 1030" },
                    { 59, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6597), 9, false, true, null, "Nvidia GeForce GTX 1050" },
                    { 60, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6597), 9, false, true, null, "Nvidia GeForce GTX 1050 Ti" },
                    { 61, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6598), 9, false, true, null, "Nvidia GeForce GTX 1060" },
                    { 62, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6599), 9, false, true, null, "Nvidia GeForce GTX 1070" },
                    { 63, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6600), 9, false, true, null, "Nvidia GeForce GTX 1080" },
                    { 64, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6600), 9, false, true, null, "Nvidia GeForce GTX 1080 Ti" },
                    { 65, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6601), 9, false, true, null, "Nvidia GeForce GTX 1650" },
                    { 67, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6632), 9, false, true, null, "Nvidia GeForce GTX 1660" },
                    { 69, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6633), 9, false, true, null, "Nvidia GeForce GTX 1660 Ti" },
                    { 70, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6641), 9, false, true, null, "Nvidia GeForce GTX 1070 Ti" },
                    { 71, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6642), 9, false, true, null, "Nvidia GeForce GTX 1080 Ti" },
                    { 72, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6643), 9, false, true, null, "Nvidia GeForce RTX 2060" },
                    { 74, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6643), 9, false, true, null, "Nvidia GeForce RTX 2070" },
                    { 76, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6644), 9, false, true, null, "Nvidia GeForce RTX 2080" },
                    { 78, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6645), 9, false, true, null, "Nvidia GeForce RTX 2080 Ti" },
                    { 79, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6645), 9, false, true, null, "Nvidia GeForce RTX 3060" },
                    { 80, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6646), 9, false, true, null, "Nvidia GeForce RTX 3060 Ti" },
                    { 81, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6647), 9, false, true, null, "Nvidia GeForce RTX 3070" },
                    { 82, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6648), 9, false, true, null, "Nvidia GeForce RTX 3070 Ti" },
                    { 83, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6648), 9, false, true, null, "Nvidia GeForce RTX 3080" },
                    { 84, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6649), 9, false, true, null, "Nvidia GeForce RTX 3080 Ti" },
                    { 85, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6650), 9, false, true, null, "Nvidia GeForce RTX 3090" },
                    { 86, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6650), 12, false, true, null, "Windows 10" },
                    { 87, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6651), 12, false, true, null, "Windows 11" },
                    { 88, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6652), 12, false, true, null, "Mac OS" },
                    { 89, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6652), 12, false, true, null, "Linux" },
                    { 90, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6653), 12, false, true, null, "FreeDos" },
                    { 91, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6654), 13, false, true, null, "13.3 Inch" },
                    { 92, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6655), 13, false, true, null, "14 Inch" },
                    { 93, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6655), 13, false, true, null, "15.6 Inch" },
                    { 94, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6656), 13, false, true, null, "17.3 Inch" },
                    { 95, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6657), 13, false, true, null, "21.5 Inch" },
                    { 96, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6658), 13, false, true, null, "23.8 Inch" },
                    { 97, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6658), 13, false, true, null, "27 Inch" },
                    { 98, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6659), 13, false, true, null, "32 Inch" },
                    { 99, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6660), 13, false, true, null, "34 Inch" },
                    { 100, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6660), 11, false, true, null, "4 GB" },
                    { 101, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6661), 11, false, true, null, "8 GB" },
                    { 102, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6662), 11, false, true, null, "16 GB" },
                    { 103, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6663), 11, false, true, null, "32 GB" },
                    { 104, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6663), 11, false, true, null, "64 GB" },
                    { 105, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6671), 11, false, true, null, "128 GB" },
                    { 106, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6671), 16, false, true, null, "32 Inch" },
                    { 107, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6672), 16, false, true, null, "40 Inch" },
                    { 108, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6673), 16, false, true, null, "43 Inch" },
                    { 109, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6674), 16, false, true, null, "50 Inch" },
                    { 110, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6674), 16, false, true, null, "55 Inch" },
                    { 111, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6675), 16, false, true, null, "65 Inch" },
                    { 112, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6676), 16, false, true, null, "75 Inch" },
                    { 113, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6676), 17, false, true, null, "QLED" },
                    { 114, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6677), 17, false, true, null, "OLED" },
                    { 115, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6678), 17, false, true, null, "LED" },
                    { 116, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6679), 17, false, true, null, "LCD" },
                    { 117, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6679), 17, false, true, null, "Plazma" },
                    { 118, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6680), 17, false, true, null, "Curved" },
                    { 120, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6681), 18, false, true, null, "HD" },
                    { 121, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6681), 18, false, true, null, "Full HD" },
                    { 122, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6682), 18, false, true, null, "2K" },
                    { 123, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6683), 18, false, true, null, "4K" },
                    { 124, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6683), 18, false, true, null, "8K" },
                    { 126, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6684), 19, false, true, null, "DDR3" },
                    { 127, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6685), 19, false, true, null, "DDR4" },
                    { 128, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6686), 19, false, true, null, "DDR5" },
                    { 129, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6686), 20, false, true, null, "2" },
                    { 130, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6687), 20, false, true, null, "4" },
                    { 131, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6688), 20, false, true, null, "6" },
                    { 132, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6689), 20, false, true, null, "8" },
                    { 133, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6689), 21, false, true, null, "Bluetooth 4.0" },
                    { 134, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6690), 21, false, true, null, "Bluetooth 4.1" },
                    { 135, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6691), 21, false, true, null, "Bluetooth 4.2" },
                    { 136, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6691), 21, false, true, null, "Bluetooth 5.0" },
                    { 137, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6693), 21, false, true, null, "Bluetooth 5.1" },
                    { 138, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6694), 21, false, true, null, "Yok" },
                    { 139, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6695), 22, false, true, null, "500 Watt" },
                    { 140, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6702), 22, false, true, null, "600 Watt" },
                    { 141, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6703), 22, false, true, null, "650 Watt" },
                    { 142, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6704), 22, false, true, null, "700 Watt" },
                    { 143, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6704), 22, false, true, null, "750 Watt" },
                    { 144, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6705), 23, false, true, null, "120 GB" },
                    { 145, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6706), 23, false, true, null, "240 GB" },
                    { 146, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6706), 23, false, true, null, "256 GB" },
                    { 147, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6707), 23, false, true, null, "480 GB" },
                    { 148, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6708), 23, false, true, null, "500 GB" },
                    { 149, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6709), 23, false, true, null, "512 GB" },
                    { 150, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6709), 23, false, true, null, "1 TB" },
                    { 151, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6710), 23, false, true, null, "2 TB" },
                    { 152, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6711), 23, false, true, null, "4 TB" },
                    { 153, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6711), 23, false, true, null, "8 TB" },
                    { 154, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6733), 23, false, true, null, "16 TB" },
                    { 155, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6734), 24, false, true, null, "500-600 MB/s" },
                    { 156, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6734), 24, false, true, null, "600-800 MB/s" },
                    { 157, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6735), 24, false, true, null, "800-1000 MB/s" },
                    { 158, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6736), 24, false, true, null, "1000-1200 MB/s" },
                    { 159, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6736), 24, false, true, null, "1200-1400 MB/s" },
                    { 160, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6737), 24, false, true, null, "1400-1600 MB/s" },
                    { 161, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6738), 24, false, true, null, "1600-1800 MB/s" },
                    { 162, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6738), 24, false, true, null, "1800-2000 MB/s" },
                    { 163, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6739), 24, false, true, null, "2000-2200 MB/s" },
                    { 164, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6740), 24, false, true, null, "2200-2400 MB/s" },
                    { 165, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6741), 24, false, true, null, "2400-2600 MB/s" },
                    { 166, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6741), 24, false, true, null, "2600-2800 MB/s" },
                    { 167, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6742), 24, false, true, null, "2800-3000 MB/s" },
                    { 168, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6743), 24, false, true, null, "3000-3200 MB/s" },
                    { 169, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6744), 24, false, true, null, "3200-3400 MB/s" },
                    { 170, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6744), 24, false, true, null, "3400-3600 MB/s" },
                    { 171, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6745), 24, false, true, null, "3600-3800 MB/s" },
                    { 172, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6753), 24, false, true, null, "3800-4000 MB/s" },
                    { 173, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6754), 25, false, true, null, "500-600 MB/s" },
                    { 174, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6754), 25, false, true, null, "600-800 MB/s" },
                    { 175, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6755), 25, false, true, null, "800-1000 MB/s" },
                    { 176, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6756), 25, false, true, null, "1000-1200 MB/s" },
                    { 177, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6756), 25, false, true, null, "1200-1400 MB/s" },
                    { 178, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6757), 25, false, true, null, "1400-1600 MB/s" },
                    { 179, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6758), 25, false, true, null, "1600-1800 MB/s" },
                    { 180, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6759), 25, false, true, null, "1800-2000 MB/s" },
                    { 181, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6759), 25, false, true, null, "2000-2200 MB/s" },
                    { 182, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6760), 25, false, true, null, "2200-2400 MB/s" },
                    { 183, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6761), 25, false, true, null, "2400-2600 MB/s" },
                    { 184, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6761), 25, false, true, null, "2600-2800 MB/s" },
                    { 185, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6762), 25, false, true, null, "2800-3000 MB/s" },
                    { 186, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6763), 25, false, true, null, "3000-3200 MB/s" },
                    { 187, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6763), 25, false, true, null, "3200-3400 MB/s" },
                    { 188, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6764), 25, false, true, null, "3400-3600 MB/s" },
                    { 189, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6765), 25, false, true, null, "3600-3800 MB/s" },
                    { 190, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6766), 25, false, true, null, "3800-4000 MB/s" },
                    { 191, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6766), 26, false, true, null, "4 GB" },
                    { 192, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6767), 26, false, true, null, "8 GB" },
                    { 193, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6768), 26, false, true, null, "16 GB" },
                    { 194, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6768), 26, false, true, null, "32 GB" },
                    { 195, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6769), 26, false, true, null, "64 GB" },
                    { 196, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6770), 26, false, true, null, "128 GB" },
                    { 197, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6771), 28, false, true, null, "2133 MHz" },
                    { 198, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6771), 28, false, true, null, "2400 MHz" },
                    { 199, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6772), 28, false, true, null, "2666 MHz" },
                    { 200, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6773), 28, false, true, null, "3000 MHz" },
                    { 201, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6774), 28, false, true, null, "3200 MHz" },
                    { 202, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6774), 28, false, true, null, "3600 MHz" },
                    { 203, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6775), 28, false, true, null, "4000 MHz" },
                    { 204, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6776), 31, false, true, null, "1.0 GHz" },
                    { 205, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6783), 31, false, true, null, "1.2 GHz" },
                    { 206, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6784), 31, false, true, null, "1.4 GHz" },
                    { 207, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6785), 31, false, true, null, "1.6 GHz" },
                    { 208, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6785), 31, false, true, null, "1.8 GHz" },
                    { 209, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6786), 31, false, true, null, "2.0 GHz" },
                    { 210, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6787), 31, false, true, null, "2.2 GHz" },
                    { 211, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6788), 31, false, true, null, "2.4 GHz" },
                    { 212, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6788), 31, false, true, null, "2.6 GHz" },
                    { 213, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6789), 31, false, true, null, "2.8 GHz" },
                    { 214, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6790), 31, false, true, null, "3.0 GHz" },
                    { 215, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6790), 31, false, true, null, "3.2 GHz" },
                    { 216, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6791), 31, false, true, null, "3.4 GHz" },
                    { 217, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6792), 31, false, true, null, "3.6 GHz" },
                    { 218, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6792), 31, false, true, null, "3.8 GHz" },
                    { 219, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6793), 31, false, true, null, "4.0 GHz" },
                    { 220, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6794), 31, false, true, null, "4.2 GHz" },
                    { 221, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6795), 31, false, true, null, "4.4 GHz" },
                    { 222, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6795), 31, false, true, null, "4.6 GHz" },
                    { 223, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6796), 31, false, true, null, "4.8 GHz" },
                    { 224, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6797), 32, false, true, null, "2" },
                    { 225, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6797), 32, false, true, null, "4" },
                    { 226, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6798), 32, false, true, null, "6" },
                    { 227, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6799), 32, false, true, null, "8" },
                    { 228, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6800), 32, false, true, null, "10" },
                    { 229, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6800), 32, false, true, null, "12" },
                    { 230, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6801), 32, false, true, null, "16" },
                    { 231, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6802), 33, false, true, null, "Var" },
                    { 232, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6802), 33, false, true, null, "Yok" },
                    { 233, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6803), 34, false, true, null, "Siyah" },
                    { 234, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6804), 34, false, true, null, "Beyaz" },
                    { 235, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6805), 34, false, true, null, "Mavi" },
                    { 236, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6805), 34, false, true, null, "Kırmızı" },
                    { 237, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6806), 34, false, true, null, "Yeşil" },
                    { 238, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6807), 34, false, true, null, "Sarı" },
                    { 239, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6807), 34, false, true, null, "Turuncu" },
                    { 240, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6808), 34, false, true, null, "Pembe" },
                    { 241, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6809), 34, false, true, null, "Mor" },
                    { 242, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6810), 35, false, true, null, "5000 mAh" },
                    { 243, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6810), 35, false, true, null, "10000 mAh" },
                    { 244, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6811), 35, false, true, null, "20000 mAh" },
                    { 245, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6812), 35, false, true, null, "30000 mAh" },
                    { 246, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6812), 35, false, true, null, "40000 mAh" },
                    { 247, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6813), 36, false, true, null, "12-13 Inch" },
                    { 248, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6814), 36, false, true, null, "14-15 Inch" },
                    { 249, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6814), 36, false, true, null, "15-16 Inch" },
                    { 250, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6815), 36, false, true, null, "17-18 Inch" }
                });

            migrationBuilder.InsertData(
                table: "CategoryFeatures",
                columns: new[] { "Id", "CategoryId", "CreatedDate", "FeatureId", "IsDeleted", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 13, 6, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6037), 13, false, true, null },
                    { 14, 6, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6080), 14, false, true, null },
                    { 15, 6, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6081), 15, false, true, null },
                    { 16, 9, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6082), 15, false, true, null },
                    { 17, 9, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6082), 5, false, true, null },
                    { 18, 10, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6084), 16, false, true, null },
                    { 19, 10, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6085), 17, false, true, null },
                    { 20, 10, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6085), 18, false, true, null },
                    { 21, 13, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6086), 19, false, true, null },
                    { 22, 13, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6087), 20, false, true, null },
                    { 23, 13, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6087), 21, false, true, null },
                    { 24, 15, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6088), 22, false, true, null },
                    { 25, 16, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6089), 31, false, true, null },
                    { 26, 16, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6090), 32, false, true, null },
                    { 27, 17, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6090), 19, false, true, null },
                    { 28, 17, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6091), 26, false, true, null },
                    { 29, 17, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6092), 28, false, true, null },
                    { 30, 18, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6092), 23, false, true, null },
                    { 31, 19, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6093), 35, false, true, null },
                    { 32, 20, new DateTime(2024, 6, 4, 10, 54, 37, 710, DateTimeKind.Utc).AddTicks(6094), 36, false, true, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BrandCategories_BrandId",
                table: "BrandCategories",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_BrandCategories_CategoryId",
                table: "BrandCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentCategoryId",
                table: "Categories",
                column: "ParentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryFeatures_CategoryId",
                table: "CategoryFeatures",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryFeatures_FeatureId",
                table: "CategoryFeatures",
                column: "FeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_FeatureValues_FeatureId",
                table: "FeatureValues",
                column: "FeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategories_CategoryId",
                table: "ProductCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategories_ProductId",
                table: "ProductCategories",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductFeatures_FeatureValueId",
                table: "ProductFeatures",
                column: "FeatureValueId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductFeatures_ProductId",
                table: "ProductFeatures",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_ProductId",
                table: "ProductImages",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BrandCategories");

            migrationBuilder.DropTable(
                name: "CategoryFeatures");

            migrationBuilder.DropTable(
                name: "ProductCategories");

            migrationBuilder.DropTable(
                name: "ProductFeatures");

            migrationBuilder.DropTable(
                name: "ProductImages");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "FeatureValues");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Brands");
        }
    }
}
