using MongoDB.Bson;
using WatchListAPI.Models;


namespace WatchListAPI.Service
{
    public interface IWatchListService
    {
        Task CreateAsync(WatchlistItem watchlist);
        Task<List<WatchlistItem>> GetAsync();

        Task<List<WatchlistItem>> GetByUserEmailAsync(string username);

        
      // Task<WatchlistItem> GetAsync(string id);
        Task RemoveAsyc(string username, string name, string country, string industry);
        
    }
}
