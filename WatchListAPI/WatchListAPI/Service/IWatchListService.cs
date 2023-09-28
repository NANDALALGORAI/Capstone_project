using WatchListAPI.Models;


namespace WatchListAPI.Service
{
    public interface IWatchListService
    {
        Task CreateAsync(WatchlistItem watchlist);
        Task<List<WatchlistItem>> GetAsync();

        Task<List<WatchlistItem>> GetByUserEmailAsync(string username);

        
       Task<WatchlistItem> GetAsync(int id);
        Task RemoveAsyc(int id);
        
    }
}
