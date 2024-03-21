namespace Billboard.Application.Exceptions.NoPermission
{
    public class PhoneNumberAlreadyHaveException : NoPermissionException
    {
        public PhoneNumberAlreadyHaveException(string phoneNumber) : base($"PhoneNumber: {phoneNumber} has already been received")
        {
        }
    }
}
