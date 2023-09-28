using WatchListAPI.Models;
using WatchListAPI.Service;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(option =>
{
    option.AddPolicy("Policy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();

    });
});


builder.Services.AddControllers();
builder.Services.Configure<WatchListDBDatabaseSettings>(
    builder.Configuration.GetSection("WatchListDatabase")
    );
builder.Services.AddSingleton<WatchlistService>();

var app = builder.Build();




// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Policy");

app.MapControllers();


app.Run();

