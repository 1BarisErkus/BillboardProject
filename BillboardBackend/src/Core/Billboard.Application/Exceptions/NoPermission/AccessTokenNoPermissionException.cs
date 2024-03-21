namespace Billboard.Application.Exceptions.NoPermission
{
    public class AccessTokenNoPermissionException : NoPermissionException
    {
        public AccessTokenNoPermissionException() : base("Invalid Access Token")
        {
        }
    }
}
