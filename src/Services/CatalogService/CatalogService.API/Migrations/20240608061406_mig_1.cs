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
                    { 1, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3904), false, "APPLE", true, null },
                    { 2, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3913), false, "SAMSUNG", true, null },
                    { 3, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3914), false, "HUAWEI", true, null },
                    { 4, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3916), false, "XIAOMİ", true, null },
                    { 5, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3917), false, "OPPO", true, null },
                    { 6, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3919), false, "VESTEL", true, null },
                    { 7, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3919), false, "ASUS", true, null },
                    { 8, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3921), false, "LENOVO", true, null },
                    { 9, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3921), false, "HP", true, null },
                    { 10, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3923), false, "MONSTER", true, null },
                    { 11, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3923), false, "LOGITECH", true, null },
                    { 12, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3924), false, "JBL", true, null },
                    { 13, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3925), false, "SENNHEISER", true, null },
                    { 14, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3926), false, "SEAGATE", true, null },
                    { 15, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3927), false, "WD", true, null },
                    { 16, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3927), false, "KINGSTON", true, null },
                    { 17, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3928), false, "CRUCIAL", true, null },
                    { 18, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3929), false, "ACER", true, null },
                    { 19, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3930), false, "MSI", true, null },
                    { 20, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3931), false, "CASPER", true, null },
                    { 21, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3932), false, "TCL", true, null },
                    { 22, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3933), false, "PHILIPS", true, null },
                    { 23, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3933), false, "LG", true, null },
                    { 24, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3934), false, "Sony SONY", true, null },
                    { 25, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3935), false, "CANON", true, null },
                    { 26, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3936), false, "AMD", true, null },
                    { 27, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3957), false, "INTEL", true, null },
                    { 28, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3958), false, "NVIDIA", true, null },
                    { 29, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3959), false, "GIGABYTE", true, null },
                    { 30, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3960), false, "CORSAIR", true, null },
                    { 31, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3961), false, "GSKILL", true, null },
                    { 32, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3962), false, "RAMPAGE", true, null },
                    { 33, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3963), false, "STEELSERIES", true, null },
                    { 34, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3964), false, "RAZER", true, null },
                    { 35, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3965), false, "DELL", true, null },
                    { 36, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3966), false, "THERMALTAKE", true, null },
                    { 37, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3966), false, "COOLER MASTER", true, null },
                    { 38, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3967), false, "DEEPCOOL", true, null },
                    { 39, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3968), false, "JWIN", true, null },
                    { 40, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3969), false, "ANKER", true, null },
                    { 41, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3970), false, "ARZUM", true, null },
                    { 42, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3970), false, "BOSCH", true, null },
                    { 44, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3971), false, "ARCELIK", true, null },
                    { 45, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3972), false, "BEKO", true, null },
                    { 46, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3973), false, "FAKIR", true, null },
                    { 47, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3973), false, "BRAUN", true, null },
                    { 48, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3974), false, "ADDISON", true, null },
                    { 49, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3975), false, "CELLURLARLINE", true, null },
                    { 50, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(3976), false, "NIKON", true, null }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedDate", "IsDeleted", "Name", "ParentCategoryId", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4025), false, "Telefon", null, true, null },
                    { 2, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4032), false, "Bilgisayar", null, true, null },
                    { 3, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4034), false, "Tv, Görüntü ve Ses", null, true, null },
                    { 4, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4035), false, "Bilgisayar Parçaları", null, true, null },
                    { 5, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4036), false, "Aksesuar", null, true, null }
                });

            migrationBuilder.InsertData(
                table: "Features",
                columns: new[] { "Id", "CreatedDate", "IsDeleted", "Name", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(7261), false, "Dahili Hafıza (Mobil)", true, null },
                    { 2, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8578), false, "Ekran Boyutu Aralığı", true, null },
                    { 3, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8583), false, "RAM Boyutu (Mobil)", true, null },
                    { 4, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8584), false, "Kamera Çözünürlüğü", true, null },
                    { 5, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8586), false, "Ekran Yenileme Hızı", true, null },
                    { 6, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8593), false, "Batarya", true, null },
                    { 7, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8595), false, "İşletim Sistemi (Mobil)", true, null },
                    { 8, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8596), false, "İşlemci", true, null },
                    { 9, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8597), false, "Ekran Kartı", true, null },
                    { 10, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8598), false, "Dahili Hafıza (Bilgisayar)", true, null },
                    { 11, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8599), false, "RAM Boyutu (Bilgisayar)", true, null },
                    { 12, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8600), false, "İşletim Sistemi (Bilgisayar)", true, null },
                    { 13, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8601), false, "Ekran Boyutu (Bilgisayar)", true, null },
                    { 14, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8602), false, "Aydınlatmalı Klavye", true, null },
                    { 15, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8603), false, "Çözünürlük (Piksel)", true, null },
                    { 16, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8604), false, "Ekran Boyutu (TV)", true, null },
                    { 17, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8605), false, "Ekran Tipi", true, null },
                    { 18, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8606), false, "Çözünürlük (TV)", true, null },
                    { 19, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8607), false, "RAM Tipi", true, null },
                    { 20, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8609), false, "RAM Slot Sayısı", true, null },
                    { 21, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8622), false, "Bluetooth Desteği", true, null },
                    { 22, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8623), false, "Güç Değeri", true, null },
                    { 23, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8623), false, "Kapasite (SSD)", true, null },
                    { 24, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8624), false, "Okuma Hızı", true, null },
                    { 25, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8625), false, "Yazma Hızı", true, null },
                    { 26, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8626), false, "Ram Kapasitesi", true, null },
                    { 28, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8627), false, "Ram Hızı", true, null },
                    { 31, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8628), false, "İşlemci Hızı", true, null },
                    { 32, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8629), false, "İşlemci Çekirdek Sayısı", true, null },
                    { 33, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8630), false, "Kablosuz Şarj", true, null },
                    { 34, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8631), false, "Renk", true, null },
                    { 35, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8632), false, "Kapasite (Powerbank)", true, null },
                    { 36, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8633), false, "Laptop Boyut Aralığı", true, null }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedDate", "IsDeleted", "Name", "ParentCategoryId", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 6, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4038), false, "Notebook", 2, true, null },
                    { 7, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4040), false, "Masaüstü Bilgisayar", 2, true, null },
                    { 8, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4042), false, "Tabletler", 2, true, null },
                    { 9, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4043), false, "Monitörler", 2, true, null },
                    { 10, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4071), false, "Televizyonlar", 3, true, null },
                    { 11, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4073), false, "Projeksiyonlar", 3, true, null },
                    { 12, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4074), false, "Kulaklık", 3, true, null },
                    { 13, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4075), false, "Anakart", 4, true, null },
                    { 14, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4076), false, "Ekran Kartları", 4, true, null },
                    { 15, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4078), false, "Güç Kaynakları", 4, true, null },
                    { 16, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4079), false, "İşlemciler", 4, true, null },
                    { 17, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4080), false, "Ram", 4, true, null },
                    { 18, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4082), false, "SSD", 4, true, null },
                    { 19, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4083), false, "Powerbank", 5, true, null },
                    { 20, new DateTime(2024, 6, 8, 6, 14, 6, 453, DateTimeKind.Utc).AddTicks(4085), false, "Laptop Çantaları", 5, true, null }
                });

            migrationBuilder.InsertData(
                table: "CategoryFeatures",
                columns: new[] { "Id", "CategoryId", "CreatedDate", "FeatureId", "IsDeleted", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(8870), 1, false, true, null },
                    { 2, 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9312), 2, false, true, null },
                    { 3, 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9314), 3, false, true, null },
                    { 4, 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9315), 4, false, true, null },
                    { 5, 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9316), 5, false, true, null },
                    { 6, 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9369), 6, false, true, null },
                    { 7, 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9370), 7, false, true, null },
                    { 8, 2, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9370), 8, false, true, null },
                    { 9, 2, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9371), 9, false, true, null },
                    { 10, 2, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9373), 10, false, true, null },
                    { 11, 2, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9373), 11, false, true, null },
                    { 12, 2, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9374), 12, false, true, null }
                });

            migrationBuilder.InsertData(
                table: "FeatureValues",
                columns: new[] { "Id", "CreatedDate", "FeatureId", "IsDeleted", "Status", "UpdatedDate", "Value" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9623), 1, false, true, null, "16 GB" },
                    { 2, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(76), 1, false, true, null, "32 GB" },
                    { 3, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(78), 1, false, true, null, "64 GB" },
                    { 4, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(79), 1, false, true, null, "128 GB" },
                    { 5, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(80), 1, false, true, null, "256 GB" },
                    { 6, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(82), 1, false, true, null, "512 GB" },
                    { 7, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(82), 1, false, true, null, "1 TB" },
                    { 8, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(83), 2, false, true, null, "5.1 Inch - 6.00 Inch" },
                    { 9, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(84), 2, false, true, null, "6.1 Inch - 6.5 Inch" },
                    { 10, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(85), 2, false, true, null, "6.5+ Inch" },
                    { 11, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(86), 3, false, true, null, "2 GB" },
                    { 12, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(87), 3, false, true, null, "3 GB" },
                    { 13, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(87), 3, false, true, null, "4 GB" },
                    { 14, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(88), 3, false, true, null, "6 GB" },
                    { 15, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(89), 3, false, true, null, "8 GB" },
                    { 16, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(89), 3, false, true, null, "12 GB" },
                    { 17, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(90), 3, false, true, null, "16 GB" },
                    { 18, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(91), 4, false, true, null, "12 MP" },
                    { 19, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(92), 4, false, true, null, "16 MP" },
                    { 20, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(93), 4, false, true, null, "20 MP" },
                    { 21, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(94), 4, false, true, null, "24 MP" },
                    { 22, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(94), 4, false, true, null, "32 MP" },
                    { 23, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(95), 4, false, true, null, "48+ MP" },
                    { 24, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(112), 5, false, true, null, "60 Hz" },
                    { 25, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(113), 5, false, true, null, "90 Hz" },
                    { 26, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(114), 5, false, true, null, "120 Hz" },
                    { 27, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(115), 6, false, true, null, "3000 mAh" },
                    { 28, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(115), 6, false, true, null, "4000 mAh" },
                    { 29, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(116), 6, false, true, null, "5000 mAh" },
                    { 30, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(117), 6, false, true, null, "6000 mAh" },
                    { 31, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(117), 6, false, true, null, "7000 mAh" },
                    { 32, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(118), 7, false, true, null, "Android" },
                    { 33, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(119), 7, false, true, null, "IOS" },
                    { 34, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(120), 8, false, true, null, "AMD Ryzen 3" },
                    { 35, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(121), 8, false, true, null, "AMD Ryzen 5" },
                    { 36, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(122), 8, false, true, null, "AMD Ryzen 7" },
                    { 37, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(122), 8, false, true, null, "AMD Ryzen 9" },
                    { 38, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(123), 8, false, true, null, "Intel Core i3" },
                    { 39, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(124), 8, false, true, null, "Intel Core i5" },
                    { 40, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(124), 8, false, true, null, "Intel Core i7" },
                    { 41, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(125), 8, false, true, null, "Intel Core i9" },
                    { 42, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(126), 8, false, true, null, "Intel Xeon" },
                    { 43, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(127), 8, false, true, null, "Intel Pentium" },
                    { 44, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(127), 8, false, true, null, "Intel Celeron" },
                    { 45, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(128), 8, false, true, null, "Intel Atom" },
                    { 46, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(129), 9, false, true, null, "AMD Radeon RX 550" },
                    { 47, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(130), 9, false, true, null, "AMD Radeon RX 560" },
                    { 48, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(130), 9, false, true, null, "AMD Radeon RX 570" },
                    { 49, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(131), 9, false, true, null, "AMD Radeon RX 580" },
                    { 50, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(132), 9, false, true, null, "AMD Radeon RX 590" },
                    { 51, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(133), 9, false, true, null, "AMD Radeon RX 5500 XT" },
                    { 52, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(133), 9, false, true, null, "AMD Radeon RX 5600 XT" },
                    { 53, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(134), 9, false, true, null, "AMD Radeon RX 5700 XT" },
                    { 54, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(135), 9, false, true, null, "AMD Radeon RX 6800 XT" },
                    { 55, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(135), 9, false, true, null, "AMD Radeon RX 6900 XT" },
                    { 56, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(145), 9, false, true, null, "Nvidia GeForce GT 710" },
                    { 57, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(146), 9, false, true, null, "Nvidia GeForce GT 730" },
                    { 58, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(146), 9, false, true, null, "Nvidia GeForce GT 1030" },
                    { 59, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(147), 9, false, true, null, "Nvidia GeForce GTX 1050" },
                    { 60, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(148), 9, false, true, null, "Nvidia GeForce GTX 1050 Ti" },
                    { 61, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(148), 9, false, true, null, "Nvidia GeForce GTX 1060" },
                    { 62, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(149), 9, false, true, null, "Nvidia GeForce GTX 1070" },
                    { 63, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(150), 9, false, true, null, "Nvidia GeForce GTX 1080" },
                    { 64, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(185), 9, false, true, null, "Nvidia GeForce GTX 1080 Ti" },
                    { 65, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(186), 9, false, true, null, "Nvidia GeForce GTX 1650" },
                    { 67, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(188), 9, false, true, null, "Nvidia GeForce GTX 1660" },
                    { 69, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(188), 9, false, true, null, "Nvidia GeForce GTX 1660 Ti" },
                    { 70, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(189), 9, false, true, null, "Nvidia GeForce GTX 1070 Ti" },
                    { 71, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(190), 9, false, true, null, "Nvidia GeForce GTX 1080 Ti" },
                    { 72, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(190), 9, false, true, null, "Nvidia GeForce RTX 2060" },
                    { 74, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(191), 9, false, true, null, "Nvidia GeForce RTX 2070" },
                    { 76, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(192), 9, false, true, null, "Nvidia GeForce RTX 2080" },
                    { 78, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(192), 9, false, true, null, "Nvidia GeForce RTX 2080 Ti" },
                    { 79, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(193), 9, false, true, null, "Nvidia GeForce RTX 3060" },
                    { 80, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(194), 9, false, true, null, "Nvidia GeForce RTX 3060 Ti" },
                    { 81, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(195), 9, false, true, null, "Nvidia GeForce RTX 3070" },
                    { 82, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(195), 9, false, true, null, "Nvidia GeForce RTX 3070 Ti" },
                    { 83, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(196), 9, false, true, null, "Nvidia GeForce RTX 3080" },
                    { 84, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(197), 9, false, true, null, "Nvidia GeForce RTX 3080 Ti" },
                    { 85, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(197), 9, false, true, null, "Nvidia GeForce RTX 3090" },
                    { 86, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(198), 12, false, true, null, "Windows 10" },
                    { 87, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(199), 12, false, true, null, "Windows 11" },
                    { 88, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(200), 12, false, true, null, "Mac OS" },
                    { 89, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(200), 12, false, true, null, "Linux" },
                    { 90, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(201), 12, false, true, null, "FreeDos" },
                    { 91, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(202), 13, false, true, null, "13.3 Inch" },
                    { 92, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(202), 13, false, true, null, "14 Inch" },
                    { 93, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(203), 13, false, true, null, "15.6 Inch" },
                    { 94, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(212), 13, false, true, null, "17.3 Inch" },
                    { 95, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(214), 13, false, true, null, "21.5 Inch" },
                    { 96, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(214), 13, false, true, null, "23.8 Inch" },
                    { 97, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(215), 13, false, true, null, "27 Inch" },
                    { 98, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(216), 13, false, true, null, "32 Inch" },
                    { 99, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(217), 13, false, true, null, "34 Inch" },
                    { 100, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(217), 11, false, true, null, "4 GB" },
                    { 101, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(218), 11, false, true, null, "8 GB" },
                    { 102, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(219), 11, false, true, null, "16 GB" },
                    { 103, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(219), 11, false, true, null, "32 GB" },
                    { 104, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(220), 11, false, true, null, "64 GB" },
                    { 105, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(221), 11, false, true, null, "128 GB" },
                    { 106, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(222), 16, false, true, null, "32 Inch" },
                    { 107, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(222), 16, false, true, null, "40 Inch" },
                    { 108, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(223), 16, false, true, null, "43 Inch" },
                    { 109, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(224), 16, false, true, null, "50 Inch" },
                    { 110, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(224), 16, false, true, null, "55 Inch" },
                    { 111, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(225), 16, false, true, null, "65 Inch" },
                    { 112, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(226), 16, false, true, null, "75 Inch" },
                    { 113, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(227), 17, false, true, null, "QLED" },
                    { 114, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(227), 17, false, true, null, "OLED" },
                    { 115, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(228), 17, false, true, null, "LED" },
                    { 116, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(229), 17, false, true, null, "LCD" },
                    { 117, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(229), 17, false, true, null, "Plazma" },
                    { 118, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(230), 17, false, true, null, "Curved" },
                    { 120, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(231), 18, false, true, null, "HD" },
                    { 121, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(231), 18, false, true, null, "Full HD" },
                    { 122, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(232), 18, false, true, null, "2K" },
                    { 123, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(233), 18, false, true, null, "4K" },
                    { 124, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(234), 18, false, true, null, "8K" },
                    { 126, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(234), 19, false, true, null, "DDR3" },
                    { 127, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(235), 19, false, true, null, "DDR4" },
                    { 128, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(243), 19, false, true, null, "DDR5" },
                    { 129, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(244), 20, false, true, null, "2" },
                    { 130, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(245), 20, false, true, null, "4" },
                    { 131, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(245), 20, false, true, null, "6" },
                    { 132, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(246), 20, false, true, null, "8" },
                    { 133, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(247), 21, false, true, null, "Bluetooth 4.0" },
                    { 134, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(247), 21, false, true, null, "Bluetooth 4.1" },
                    { 135, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(248), 21, false, true, null, "Bluetooth 4.2" },
                    { 136, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(249), 21, false, true, null, "Bluetooth 5.0" },
                    { 137, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(251), 21, false, true, null, "Bluetooth 5.1" },
                    { 138, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(251), 21, false, true, null, "Yok" },
                    { 139, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(252), 22, false, true, null, "500 Watt" },
                    { 140, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(253), 22, false, true, null, "600 Watt" },
                    { 141, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(254), 22, false, true, null, "650 Watt" },
                    { 142, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(275), 22, false, true, null, "700 Watt" },
                    { 143, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(276), 22, false, true, null, "750 Watt" },
                    { 144, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(277), 23, false, true, null, "120 GB" },
                    { 145, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(278), 23, false, true, null, "240 GB" },
                    { 146, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(278), 23, false, true, null, "256 GB" },
                    { 147, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(279), 23, false, true, null, "480 GB" },
                    { 148, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(280), 23, false, true, null, "500 GB" },
                    { 149, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(281), 23, false, true, null, "512 GB" },
                    { 150, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(281), 23, false, true, null, "1 TB" },
                    { 151, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(282), 23, false, true, null, "2 TB" },
                    { 152, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(283), 23, false, true, null, "4 TB" },
                    { 153, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(283), 23, false, true, null, "8 TB" },
                    { 154, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(284), 23, false, true, null, "16 TB" },
                    { 155, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(285), 24, false, true, null, "500-600 MB/s" },
                    { 156, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(286), 24, false, true, null, "600-800 MB/s" },
                    { 157, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(286), 24, false, true, null, "800-1000 MB/s" },
                    { 158, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(287), 24, false, true, null, "1000-1200 MB/s" },
                    { 159, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(288), 24, false, true, null, "1200-1400 MB/s" },
                    { 160, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(288), 24, false, true, null, "1400-1600 MB/s" },
                    { 161, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(296), 24, false, true, null, "1600-1800 MB/s" },
                    { 162, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(297), 24, false, true, null, "1800-2000 MB/s" },
                    { 163, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(298), 24, false, true, null, "2000-2200 MB/s" },
                    { 164, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(298), 24, false, true, null, "2200-2400 MB/s" },
                    { 165, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(299), 24, false, true, null, "2400-2600 MB/s" },
                    { 166, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(300), 24, false, true, null, "2600-2800 MB/s" },
                    { 167, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(301), 24, false, true, null, "2800-3000 MB/s" },
                    { 168, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(301), 24, false, true, null, "3000-3200 MB/s" },
                    { 169, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(302), 24, false, true, null, "3200-3400 MB/s" },
                    { 170, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(303), 24, false, true, null, "3400-3600 MB/s" },
                    { 171, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(303), 24, false, true, null, "3600-3800 MB/s" },
                    { 172, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(304), 24, false, true, null, "3800-4000 MB/s" },
                    { 173, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(305), 25, false, true, null, "500-600 MB/s" },
                    { 174, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(306), 25, false, true, null, "600-800 MB/s" },
                    { 175, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(306), 25, false, true, null, "800-1000 MB/s" },
                    { 176, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(307), 25, false, true, null, "1000-1200 MB/s" },
                    { 177, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(308), 25, false, true, null, "1200-1400 MB/s" },
                    { 178, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(308), 25, false, true, null, "1400-1600 MB/s" },
                    { 179, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(309), 25, false, true, null, "1600-1800 MB/s" },
                    { 180, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(310), 25, false, true, null, "1800-2000 MB/s" },
                    { 181, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(311), 25, false, true, null, "2000-2200 MB/s" },
                    { 182, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(311), 25, false, true, null, "2200-2400 MB/s" },
                    { 183, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(312), 25, false, true, null, "2400-2600 MB/s" },
                    { 184, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(313), 25, false, true, null, "2600-2800 MB/s" },
                    { 185, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(313), 25, false, true, null, "2800-3000 MB/s" },
                    { 186, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(314), 25, false, true, null, "3000-3200 MB/s" },
                    { 187, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(315), 25, false, true, null, "3200-3400 MB/s" },
                    { 188, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(316), 25, false, true, null, "3400-3600 MB/s" },
                    { 189, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(316), 25, false, true, null, "3600-3800 MB/s" },
                    { 190, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(317), 25, false, true, null, "3800-4000 MB/s" },
                    { 191, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(318), 26, false, true, null, "4 GB" },
                    { 192, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(318), 26, false, true, null, "8 GB" },
                    { 193, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(326), 26, false, true, null, "16 GB" },
                    { 194, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(326), 26, false, true, null, "32 GB" },
                    { 195, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(327), 26, false, true, null, "64 GB" },
                    { 196, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(328), 26, false, true, null, "128 GB" },
                    { 197, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(328), 28, false, true, null, "2133 MHz" },
                    { 198, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(329), 28, false, true, null, "2400 MHz" },
                    { 199, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(330), 28, false, true, null, "2666 MHz" },
                    { 200, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(330), 28, false, true, null, "3000 MHz" },
                    { 201, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(331), 28, false, true, null, "3200 MHz" },
                    { 202, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(332), 28, false, true, null, "3600 MHz" },
                    { 203, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(333), 28, false, true, null, "4000 MHz" },
                    { 204, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(333), 31, false, true, null, "1.0 GHz" },
                    { 205, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(334), 31, false, true, null, "1.2 GHz" },
                    { 206, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(335), 31, false, true, null, "1.4 GHz" },
                    { 207, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(335), 31, false, true, null, "1.6 GHz" },
                    { 208, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(336), 31, false, true, null, "1.8 GHz" },
                    { 209, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(337), 31, false, true, null, "2.0 GHz" },
                    { 210, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(338), 31, false, true, null, "2.2 GHz" },
                    { 211, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(338), 31, false, true, null, "2.4 GHz" },
                    { 212, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(339), 31, false, true, null, "2.6 GHz" },
                    { 213, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(340), 31, false, true, null, "2.8 GHz" },
                    { 214, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(340), 31, false, true, null, "3.0 GHz" },
                    { 215, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(341), 31, false, true, null, "3.2 GHz" },
                    { 216, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(342), 31, false, true, null, "3.4 GHz" },
                    { 217, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(343), 31, false, true, null, "3.6 GHz" },
                    { 218, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(343), 31, false, true, null, "3.8 GHz" },
                    { 219, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(344), 31, false, true, null, "4.0 GHz" },
                    { 220, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(345), 31, false, true, null, "4.2 GHz" },
                    { 221, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(345), 31, false, true, null, "4.4 GHz" },
                    { 222, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(346), 31, false, true, null, "4.6 GHz" },
                    { 223, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(347), 31, false, true, null, "4.8 GHz" },
                    { 224, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(348), 32, false, true, null, "2" },
                    { 225, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(348), 32, false, true, null, "4" },
                    { 226, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(356), 32, false, true, null, "6" },
                    { 227, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(357), 32, false, true, null, "8" },
                    { 228, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(357), 32, false, true, null, "10" },
                    { 229, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(358), 32, false, true, null, "12" },
                    { 230, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(359), 32, false, true, null, "16" },
                    { 231, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(360), 33, false, true, null, "Var" },
                    { 232, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(360), 33, false, true, null, "Yok" },
                    { 233, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(361), 34, false, true, null, "Siyah" },
                    { 234, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(362), 34, false, true, null, "Beyaz" },
                    { 235, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(362), 34, false, true, null, "Mavi" },
                    { 236, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(363), 34, false, true, null, "Kırmızı" },
                    { 237, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(364), 34, false, true, null, "Yeşil" },
                    { 238, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(365), 34, false, true, null, "Sarı" },
                    { 239, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(365), 34, false, true, null, "Turuncu" },
                    { 240, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(366), 34, false, true, null, "Pembe" },
                    { 241, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(367), 34, false, true, null, "Mor" },
                    { 242, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(367), 35, false, true, null, "5000 mAh" },
                    { 243, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(368), 35, false, true, null, "10000 mAh" },
                    { 244, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(369), 35, false, true, null, "20000 mAh" },
                    { 245, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(370), 35, false, true, null, "30000 mAh" },
                    { 246, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(370), 35, false, true, null, "40000 mAh" },
                    { 247, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(371), 36, false, true, null, "12-13 Inch" },
                    { 248, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(372), 36, false, true, null, "14-15 Inch" },
                    { 249, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(372), 36, false, true, null, "15-16 Inch" },
                    { 250, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(373), 36, false, true, null, "17-18 Inch" },
                    { 251, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(374), 10, false, true, null, "120 GB" },
                    { 252, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(374), 10, false, true, null, "240 GB" },
                    { 253, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(375), 10, false, true, null, "256 GB" },
                    { 254, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(376), 10, false, true, null, "480 GB" },
                    { 255, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(377), 10, false, true, null, "500 GB" },
                    { 256, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(398), 10, false, true, null, "512 GB" },
                    { 257, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(399), 10, false, true, null, "1 TB" },
                    { 258, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(400), 10, false, true, null, "2 TB" },
                    { 259, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(401), 10, false, true, null, "4 TB" },
                    { 260, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(402), 14, false, true, null, "Var" },
                    { 261, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(402), 14, false, true, null, "Yok" },
                    { 262, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(403), 15, false, true, null, "1366x768" },
                    { 263, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(404), 15, false, true, null, "1600x900" },
                    { 264, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(404), 15, false, true, null, "1920x1080" },
                    { 265, new DateTime(2024, 6, 8, 6, 14, 6, 248, DateTimeKind.Utc).AddTicks(406), 15, false, true, null, "2560x1440" }
                });

            migrationBuilder.InsertData(
                table: "CategoryFeatures",
                columns: new[] { "Id", "CategoryId", "CreatedDate", "FeatureId", "IsDeleted", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 13, 6, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9375), 13, false, true, null },
                    { 14, 6, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9375), 14, false, true, null },
                    { 15, 6, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9376), 15, false, true, null },
                    { 16, 9, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9377), 15, false, true, null },
                    { 17, 9, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9378), 5, false, true, null },
                    { 18, 10, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9379), 16, false, true, null },
                    { 19, 10, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9380), 17, false, true, null },
                    { 20, 10, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9381), 18, false, true, null },
                    { 21, 13, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9381), 19, false, true, null },
                    { 22, 13, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9382), 20, false, true, null },
                    { 23, 13, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9395), 21, false, true, null },
                    { 24, 15, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9396), 22, false, true, null },
                    { 25, 16, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9397), 31, false, true, null },
                    { 26, 16, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9397), 32, false, true, null },
                    { 27, 17, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9398), 19, false, true, null },
                    { 28, 17, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9399), 26, false, true, null },
                    { 29, 17, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9399), 28, false, true, null },
                    { 30, 18, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9400), 23, false, true, null },
                    { 31, 19, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9401), 35, false, true, null },
                    { 32, 20, new DateTime(2024, 6, 8, 6, 14, 6, 247, DateTimeKind.Utc).AddTicks(9401), 36, false, true, null }
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
