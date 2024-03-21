using Billboard.Application.Dtos.Billboard.Owner;

namespace Billboard.Application.Dtos.AdvertisingRequest
{
    public class AdvertisingRequestShowDto
    {
        public int Id { get; set; }
        public BillboardShowDto Billboard { get; set; }
        public int RequestedDays { get; set; }
        public int IsApproval { get; set; }
    }
}
