using Billboard.API.Extensions;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers(config =>
{
    config.RespectBrowserAcceptHeader = true;
    config.ReturnHttpNotAcceptable = true;
})
    .AddNewtonsoftJson(opt =>
    opt.SerializerSettings.ReferenceLoopHandling =
    Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddXmlDataContractSerializerFormatters()
    .AddApplicationPart(typeof(Billboard.Presentation.EmptyClass).Assembly);

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddControllersWithViews().
                AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Extensions
builder.Services.ConfigureJWT(builder.Configuration);
builder.Services.ConfigureSwagger();
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();
builder.Services.RegisterRepositories();
builder.Services.RegisterServices();
builder.Services.ConfigureSqlContext(builder.Configuration);
builder.Services.ConfigureCors();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddHttpContextAccessor();

var app = builder.Build();
app.ConfigureExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
