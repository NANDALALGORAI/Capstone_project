


using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchListAPI.Service;
using WatchListAPI.Models;
using MongoDB.Bson.IO;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<WatchlistItem>> Get(int id)
        {
            var watchlist = await _watchlistService.GetAsync(id);
            if (watchlist == null)
            {
                return NotFound();
            }
            return watchlist;

        }

        [HttpPost]
        public async Task<ActionResult> Create(WatchlistItem newList)
        {
            await _watchlistService.CreateAsync(newList);
            return Ok(newList);
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var watchlist = await _watchlistService.GetAsync(id);
            if (watchlist is null)
            {
                return NotFound("User Not found");
            }
            await _watchlistService.RemoveAsyc(id);
            return Ok("Deleted Succesfully");
        }

    }
}

