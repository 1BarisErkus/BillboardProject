namespace Billboard.Application.Exceptions.NoPermission
{
    public class OldPasswordDoesNotMatchException : NoPermissionException
    {
        public OldPasswordDoesNotMatchException() : base("Old Password does not match.")
        {
        }
    }
}
