namespace Billboard.Application.Exceptions.NoPermission
{
    public class BillboardCodeAlreadyHaveException : NoPermissionException
    {
        public BillboardCodeAlreadyHaveException(string code) : base($"Billboard: {code} has already been received")
        {
        }
    }
}
