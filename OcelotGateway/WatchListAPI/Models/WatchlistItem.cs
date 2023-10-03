using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;


namespace WatchListAPI.Models
{
    public class WatchlistItem
    {
       
        
        [BsonId]
        public ObjectId Id { get; set; }

        public string Username { get; set; }

        public string Symbol { get; set; }

        public string Url { get; set; }

        public string Image_url { get; set; }

        public string Name { get; set; }

        public string Country { get; set; }

        public string Industry { get; set; }

        public string Type { get; set; }

        public double MatchScore { get; set; }

        public double SentimentScore { get; set; }
    }
}



