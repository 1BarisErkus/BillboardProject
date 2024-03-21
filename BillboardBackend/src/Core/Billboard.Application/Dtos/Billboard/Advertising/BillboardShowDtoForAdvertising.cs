using Billboard.Application.Dtos.User;

namespace Billboard.Application.Dtos.Billboard.Advertising
{
    public class BillboardShowDtoForAdvertising
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string LocationTitle { get; set; }
        public string LocationCoordinate { get; set; }
        public UserShowDto Owner { get; set; }
        public byte[] PhotoUrl { get; set; }
        public DateTime? ExpireDateTime { get; set; }
        public int CreatedUserId { get; set; }
        public int UpdatedUserId { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime UpdatedDateTime { get; set; }
    }
}
