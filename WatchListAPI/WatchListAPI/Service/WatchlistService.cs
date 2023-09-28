using WatchListAPI.Models;
using WatchListAPI.Service;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace WatchListAPI.Service
{
    public class WatchlistService : IWatchListService
    {

        private readonly IMongoCollection<WatchlistItem> _watchlistCollection;
        private IEnumerable<WatchlistItem> _watchList;


        public WatchlistService(IOptions<WatchListDBDatabaseSettings> watchlistDbDatabaseSettings)
        {
            var mongoClient = new MongoClient(watchlistDbDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(watchlistDbDatabaseSettings.Value.DatabaseName);
            _watchlistCollection = mongoDatabase.GetCollection<WatchlistItem>(watchlistDbDatabaseSettings.Value.WatchListCollectionName);
        }
        public async Task<List<WatchlistItem>> GetAsync() =>
            await _watchlistCollection.Find(_ => true).ToListAsync();

        public async Task<WatchlistItem?> GetAsync(int id) =>
            await _watchlistCollection.Find(x => x.Id == id).FirstOrDefaultAsync();


        public async Task CreateAsync(WatchlistItem newList) =>
            await _watchlistCollection.InsertOneAsync(newList);


        public async Task<List<WatchlistItem>> GetByUserEmailAsync(string username)
        {
            var filter = Builders<WatchlistItem>.Filter.Eq(x => x.Username, username);
            var watchlistItems = await _watchlistCollection.Find(filter).ToListAsync();
            return watchlistItems;
        }


        public async Task RemoveAsyc(int id) =>
            await _watchlistCollection.DeleteOneAsync(x => x.Id == id);



    }
}

