namespace Billboard.Application.Dtos.User
{
    public class UserShowDto
    {
        public int Id { get; set; }
        public String FullName { get; set; }
        public String Email { get; set; }
        public String PhoneNumber { get; set; }
        public String Password { get; set; }
        public int AccountType { get; set; }
        public byte[]? PhotoUrl { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime UpdatedDateTime { get; set; }
    }
}
