namespace Billboard.Application.Dtos.Billboard.Owner
{
    public class BillboardUpdateDto
    {
        public int Id { get; set; }
        public String Code { get; set; }
        public String LocationTitle { get; set; }
        public String LocationCoordinate { get; set; }
        public byte[]? PhotoUrl { get; set; }
        public DateTime? ExpireDateTime { get; set; }
    }
}