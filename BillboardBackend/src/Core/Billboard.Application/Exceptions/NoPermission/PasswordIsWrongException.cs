namespace Billboard.Application.Exceptions.NoPermission
{
    public class PasswordIsWrongException : NoPermissionException
    {
        public PasswordIsWrongException() : base("Password is wrong.")
        {
        }
    }
}
