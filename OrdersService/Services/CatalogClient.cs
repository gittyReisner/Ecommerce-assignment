using OrdersService.Dtos;

namespace OrdersService.Services;

public class CatalogClient
{
    private readonly HttpClient _http;

    public CatalogClient(HttpClient http)
    {
        _http = http;
    }

    public async Task<ProductDto?> GetProduct(Guid productId)
    {
        var response = await _http.GetAsync($"/api/products/{productId}");
        if (!response.IsSuccessStatusCode)
            return null;

        return await response.Content.ReadFromJsonAsync<ProductDto>();
    }
}
