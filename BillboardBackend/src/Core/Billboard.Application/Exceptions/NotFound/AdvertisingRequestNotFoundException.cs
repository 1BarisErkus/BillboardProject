namespace Billboard.Application.Exceptions.NotFound
{
    public class AdvertisingRequestNotFoundException : NotFoundException
    {
        public AdvertisingRequestNotFoundException(int id) : base($"The Advertising Request with id: {id} could not found.")
        {
        }
    }
}
