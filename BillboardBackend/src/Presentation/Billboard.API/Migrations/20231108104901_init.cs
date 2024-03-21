using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Billboard.API.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdvertisingRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillboardId = table.Column<int>(type: "int", nullable: false),
                    RequestedUserId = table.Column<int>(type: "int", nullable: false),
                    IsApproval = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertisingRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Billboards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationCoordinate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdvertisingId = table.Column<int>(type: "int", nullable: false),
                    PhotoUrl = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ExpireDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedUserId = table.Column<int>(type: "int", nullable: false),
                    UpdatedUserId = table.Column<int>(type: "int", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Billboards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountType = table.Column<int>(type: "int", nullable: false),
                    PhotoUrl = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdvertisingRequests");

            migrationBuilder.DropTable(
                name: "Billboards");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
