using AutoMapper;
using Billboard.Application.Dtos.AdvertisingRequest;
using Billboard.Application.Dtos.Billboard.Advertising;
using Billboard.Application.Dtos.Billboard.Owner;
using Billboard.Application.Dtos.User;
using Billboard.Domain.Entities;

namespace Billboard.API.Utilities.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserShowDto>();
            CreateMap<User, UserRegisterDto>().ReverseMap();
            
            CreateMap<Domain.Entities.Billboard, BillboardShowDto>();
            CreateMap<Domain.Entities.Billboard, BillboardShowDtoForAdvertising>();
            CreateMap<Domain.Entities.Billboard, BillboardCreateDto>().ReverseMap();
            CreateMap<Domain.Entities.Billboard, BillboardUpdateDto>().ReverseMap();
            CreateMap<Domain.Entities.Billboard, BillboardUpdateDto>();

            CreateMap<AdvertisingRequest, CreateAdsDto>().ReverseMap();
        }
    }
}
