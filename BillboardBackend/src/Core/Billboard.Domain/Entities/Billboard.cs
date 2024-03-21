using Billboard.Domain.Entities.Common;

namespace Billboard.Domain.Entities
{
    public class Billboard : BaseEntity
    {
        public String Code { get; set; }
        public String LocationTitle { get; set; }
        public String LocationCoordinate { get; set; }
        public int AdvertisingId { get; set; } = 0;
        public byte[]? PhotoUrl { get; set; }
        public DateTime? ExpireDateTime { get; set; }
        public int CreatedUserId { get; set; }
        public int UpdatedUserId { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime UpdatedDateTime { get; set; }
    }
}
