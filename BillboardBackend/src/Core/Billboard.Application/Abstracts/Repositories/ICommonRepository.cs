namespace Billboard.Application.Abstracts.Repositories
{
    public interface ICommonRepository
    {
        public int GetUserIdInAccessToken(string accessToken);
    }
}
