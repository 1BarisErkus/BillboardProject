namespace Billboard.Application.Dtos.User
{
    public class UserRegisterDto
    {
        public String FullName { get; set; }
        public String Email { get; set; }
        public String PhoneNumber { get; set; }
        public String Password { get; set; }
        public int AccountType { get; set; }
    }
}
