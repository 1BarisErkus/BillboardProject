using Billboard.Domain.Entities.Common;

namespace Billboard.Domain.Entities
{
    public class AdvertisingRequest : BaseEntity
    {
        public int BillboardId { get; set; }
        public int RequestedUserId { get; set; }
        public int RequestedDays { get; set; }
        public int IsApproval { get; set; } = 0;
    }
}
