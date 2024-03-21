namespace Billboard.Application.Exceptions.NoPermission
{
    public abstract class NoPermissionException : Exception
    {
        protected NoPermissionException(string message) : base(message)
        {

        }
    }
}
