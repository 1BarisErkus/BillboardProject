namespace Billboard.Application.Exceptions.NotFound
{
    public class BillboardNotFoundException : NotFoundException
    {
        public BillboardNotFoundException(int id) : base($"The Billboard with id: {id} could not found.")
        {
        }
    }
}
