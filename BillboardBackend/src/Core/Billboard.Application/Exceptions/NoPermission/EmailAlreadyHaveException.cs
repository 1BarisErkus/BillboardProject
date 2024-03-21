namespace Billboard.Application.Exceptions.NoPermission
{
    public class EmailAlreadyHaveException : NoPermissionException
    {
        public EmailAlreadyHaveException(string email) : base($"Email: {email} has already been received")
        {
        }
    }
}
