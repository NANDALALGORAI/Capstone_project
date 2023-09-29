


using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchListAPI.Service;
using WatchListAPI.Models;
using MongoDB.Bson.IO;
using MongoDB.Bson;
using System.Globalization;

namespace WatchListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchListController : ControllerBase
    {

        private readonly WatchlistService _watchlistService;

        public WatchListController(WatchlistService _watchlistService)
        {
            this._watchlistService = _watchlistService;
        }
        [HttpGet]
        public async Task<ActionResult<List<WatchlistItem>>> Get() =>
            await _watchlistService.GetAsync();

        [HttpGet("byUsername/{username}")]
        public async Task<ActionResult<List<WatchlistItem>>> GetByEmail(string username)
        {
            var watchlistItems = await _watchlistService.GetByUserEmailAsync(username);
            if (watchlistItems == null || watchlistItems.Count == 0)
            {
                return NotFound();
            }
            return watchlistItems;
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<WatchlistItem>> Get( id)
        //{
        //    string Id = id.ToString();
        //    var watchlist = await _watchlistService.GetAsync(Id);
        //    if (watchlist == null)
        //    {
        //        return NotFound();
        //    }
        //    return watchlist;

        //}

        [HttpPost("watchlist")]
        public async Task<ActionResult> Create(WatchlistItem newList)
        {
            await _watchlistService.CreateAsync(newList);
            return Ok(newList);
        }



        [HttpDelete("{username},{name},{country},{type}")]
        public async Task<ActionResult> Delete(string username, string name, string country, string type)
        {
            var watchlist = await _watchlistService.GetByUserEmailAsync(username);
            if (watchlist is null)
            {
                return NotFound("User Not found");
            }
            var naa = await _watchlistService.GetByUserEmailAsync(name);
            if (naa is null)
            {
                return NotFound("name Not found");
            }
            var na = await _watchlistService.GetByUserEmailAsync(country);
            if (na is null)
            {
                return NotFound("country Not found");
            }
            var n = await _watchlistService.GetByUserEmailAsync(type);
            if (n is null)
            {
                return NotFound("Type Not found");
            }
            await _watchlistService.RemoveAsyc(username, name, country, type);
            return Ok("Deleted Succesfully");
        }

    }
}

