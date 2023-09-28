using System.ComponentModel.DataAnnotations;

namespace WatchListAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public List<WatchlistItem> WatchList { get; set; }
    }
}
