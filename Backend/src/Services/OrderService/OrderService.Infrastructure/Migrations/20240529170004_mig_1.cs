using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OrderService.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class mig_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ordering");

            migrationBuilder.CreateTable(
                name: "Buyers",
                schema: "ordering",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "varchar", maxLength: 200, nullable: false),
                    FullName = table.Column<string>(type: "varchar", maxLength: 100, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buyers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CardTypes",
                schema: "ordering",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardTypes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "OrderStatuses",
                schema: "ordering",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethods",
                schema: "ordering",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Alias = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CardNumber = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: false),
                    SecurityNumber = table.Column<string>(type: "text", nullable: false),
                    CardHolderName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Expiration = table.Column<DateTime>(type: "timestamp with time zone", maxLength: 25, nullable: false),
                    CardTypeId = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentMethods_Buyers_Id",
                        column: x => x.Id,
                        principalSchema: "ordering",
                        principalTable: "Buyers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaymentMethods_CardTypes_CardTypeId",
                        column: x => x.CardTypeId,
                        principalSchema: "ordering",
                        principalTable: "CardTypes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                schema: "ordering",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    BuyerId = table.Column<Guid>(type: "uuid", nullable: true),
                    OrderStatusId = table.Column<int>(type: "integer", nullable: false),
                    Address_Street = table.Column<string>(type: "text", nullable: false),
                    Address_City = table.Column<string>(type: "text", nullable: false),
                    Address_State = table.Column<string>(type: "text", nullable: false),
                    Address_Country = table.Column<string>(type: "text", nullable: false),
                    Address_ZipCode = table.Column<string>(type: "text", nullable: false),
                    NumberOfInstallments = table.Column<int>(type: "integer", nullable: false),
                    PaymentMethodId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Buyers_BuyerId",
                        column: x => x.BuyerId,
                        principalSchema: "ordering",
                        principalTable: "Buyers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_OrderStatuses_OrderStatusId",
                        column: x => x.OrderStatusId,
                        principalSchema: "ordering",
                        principalTable: "OrderStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                schema: "ordering",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    ProductName = table.Column<string>(type: "text", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "numeric", nullable: false),
                    PictureUrl = table.Column<string>(type: "text", nullable: false),
                    Units = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalSchema: "ordering",
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "ordering",
                table: "CardTypes",
                columns: new[] { "id", "Name" },
                values: new object[,]
                {
                    { 1, "Amex" },
                    { 2, "Visa" },
                    { 3, "MasterCard" }
                });

            migrationBuilder.InsertData(
                schema: "ordering",
                table: "OrderStatuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "submitted" },
                    { 2, "awaitingvalidation" },
                    { 3, "stockconfirmed" },
                    { 4, "paid" },
                    { 5, "shipped" },
                    { 6, "cancelled" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                schema: "ordering",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BuyerId",
                schema: "ordering",
                table: "Orders",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderStatusId",
                schema: "ordering",
                table: "Orders",
                column: "OrderStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_CardTypeId",
                schema: "ordering",
                table: "PaymentMethods",
                column: "CardTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems",
                schema: "ordering");

            migrationBuilder.DropTable(
                name: "PaymentMethods",
                schema: "ordering");

            migrationBuilder.DropTable(
                name: "Orders",
                schema: "ordering");

            migrationBuilder.DropTable(
                name: "CardTypes",
                schema: "ordering");

            migrationBuilder.DropTable(
                name: "Buyers",
                schema: "ordering");

            migrationBuilder.DropTable(
                name: "OrderStatuses",
                schema: "ordering");
        }
    }
}
