using Billboard.Domain.Entities.Common;

namespace Billboard.Domain.Entities
{
    public class User : BaseEntity
    {
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
