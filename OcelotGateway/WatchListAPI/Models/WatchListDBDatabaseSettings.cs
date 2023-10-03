namespace WatchListAPI.Models
{
    public class WatchListDBDatabaseSettings
    {
        public string ConnectionString { get; set; } = null;
        public string DatabaseName { get; set; } = null;

        public string WatchListCollectionName { get; set; } = null;
    }
}
