using AuthenticationApi.Models;

[TestFixture]
public class UserTests
{
    private List<User> userList;

    [SetUp]
    public void Setup()
    {
        userList = new List<User>
        {
            new User { Id = 1, Username = "Alice", Email = "alice@example.com" },
            new User { Id = 2, Username = "Bob", Email = "bob@example.com" },
            new User { Id = 3, Username = "Charlie", Email = "charlie@example.com" }
        };
    }

    [Test]
    public void TestUserListNotNull()
    {

        Assert.NotNull(userList);
    }

    [Test]
    public void TestUserListCount()
    {
        Assert.AreEqual(3, userList.Count);
    }

    [Test]
    public void TestUserEmails()
    {

        foreach (var user in userList)
        {
            Assert.IsTrue(IsValidEmail(user.Email));
        }
    }

    [Test]
    public void TestUserNames()
    {

        foreach (var user in userList)
        {
            Assert.IsFalse(string.IsNullOrWhiteSpace(user.Username));
        }
    }
    private bool IsValidEmail(string email)
    {

        return !string.IsNullOrWhiteSpace(email) && email.Contains("@");
    }
    [Test]
    public void TestUserWithNullEmail()
    {

        var userWithNullEmail = new User { Id = 4, Username = "David", Email = null };
        Assert.IsFalse(IsValidEmail(userWithNullEmail.Email));
    }

    [Test]
    public void TestUserWithInvalidEmailFormat()
    {

        var userWithInvalidEmail = new User { Id = 5, Username = "Eve", Email = "invalidemail" };
        Assert.IsFalse(IsValidEmail(userWithInvalidEmail.Email));
    }

    [Test]
    public void TestUserWithEmptyUserName()
    {

        var userWithEmptyUserName = new User { Id = 6, Username = "", Email = "eve@example.com" };
        Assert.IsTrue(string.IsNullOrWhiteSpace(userWithEmptyUserName.Username));
    }

    [Test]
    public void TestUserWithWhiteSpaceUserName()
    {

        var userWithWhiteSpaceUserName = new User { Id = 7, Username = "   ", Email = "frank@example.com" };
        Assert.IsTrue(string.IsNullOrWhiteSpace(userWithWhiteSpaceUserName.Username));
    }

}