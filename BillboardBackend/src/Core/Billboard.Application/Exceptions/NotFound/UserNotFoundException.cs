namespace Billboard.Application.Exceptions.NotFound
{
    public class UserNotFoundException : NotFoundException
    {
        public UserNotFoundException(int id) : base($"The User with id: {id} could not found.")
        {
        }
    }
}
