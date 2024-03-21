using Billboard.Application.Dtos.User;

namespace Billboard.Application.Abstracts.Services
{
    public interface IUserService
    {
        Task<UserShowDto> GetOneUserById(int id);
        Task<UserShowDto> LoginOwner(UserLoginDto userDto);
        Task<UserShowDto> LoginAdvertising(UserLoginDto userDto);
        Task<UserShowDto> Register(UserRegisterDto userDto);
        Task UpdatePassword(UserPasswordUpdateDto userDto, string Authorization);
        Task<UserShowDto> UpdatePhoto(UserPhotoUpdateDto userDto, string Authorization);
    }
}
