using AutoMapper;
using Billboard.Application.Abstracts.Services;
using Billboard.Application.Dtos.User;
using Billboard.Application.Exceptions.NoPermission;
using Billboard.Application.Exceptions.NotFound;
using Billboard.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Billboard.Persistence.Concretes.Managers
{
    public class UserManager : IUserService
    {
        private readonly IRepositoryService _manager;
        private readonly IMapper _mapper;

        public UserManager(IRepositoryService manager,
            IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public async Task<UserShowDto> GetOneUserById(int id)
        {
            var user = await _manager.User.FindByCondition(u => u.Id.Equals(id)).FirstOrDefaultAsync();

            return user == null ? throw new UserNotFoundException(id) : _mapper.Map<UserShowDto>(user);
        }

        public async Task<UserShowDto> LoginOwner(UserLoginDto userDto)
        {
            var user = await _manager.User.FindByCondition(u => u.Email == userDto.Email).FirstOrDefaultAsync();

            if (user == null)
                throw new UserNotFoundException(0);

            if (user.Password != userDto.Password)
                throw new PasswordIsWrongException();

            if(user.AccountType != 0)
                throw new UserNotFoundException(0);

            return _mapper.Map<UserShowDto>(user);
        }

        public async Task<UserShowDto> LoginAdvertising(UserLoginDto userDto)
        {
            var user = await _manager.User.FindByCondition(u => u.Email == userDto.Email).FirstOrDefaultAsync();

            if (user == null)
                throw new UserNotFoundException(0);

            if (user.Password != userDto.Password)
                throw new PasswordIsWrongException();

            if (user.AccountType != 1)
                throw new UserNotFoundException(0);

            return _mapper.Map<UserShowDto>(user);
        }

        public async Task<UserShowDto> Register(UserRegisterDto userDto)
        {
            var user = await _manager.User.FindByCondition(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            if (user != null)
                throw new EmailAlreadyHaveException(userDto.Email);

            user = await _manager.User.FindByCondition(u => u.PhoneNumber.Equals(userDto.PhoneNumber)).FirstOrDefaultAsync();
            if (user != null)
                throw new PhoneNumberAlreadyHaveException(userDto.PhoneNumber);

            user = _mapper.Map<User>(userDto);
            user.CreatedDateTime = DateTime.Now;
            user.UpdatedDateTime = DateTime.Now;

            _manager.User.Create(user);
            await _manager.SaveAsync();

            return _mapper.Map<UserShowDto>(user);
        }

        public async Task UpdatePassword(UserPasswordUpdateDto userDto, string Authorization)
        {
            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            var user = await _manager.User.FindByCondition(u => u.Id.Equals(userId)).FirstOrDefaultAsync() ?? throw new UserNotFoundException(userId);
            if (user.Password != userDto.OldPassword)
                throw new OldPasswordDoesNotMatchException();

            user.Password = userDto.NewPassword;
            user.UpdatedDateTime = DateTime.Now;

            _manager.User.Update(user);
            await _manager.SaveAsync();
        }

        public async Task<UserShowDto> UpdatePhoto(UserPhotoUpdateDto userDto, string Authorization)
        {
            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            var user = await _manager.User.FindByCondition(u => u.Id.Equals(userId)).FirstOrDefaultAsync() ?? throw new UserNotFoundException(userId);

            user.PhotoUrl = userDto.PhotoUrl;
            user.UpdatedDateTime = DateTime.Now;

            _manager.User.Update(user);
            await _manager.SaveAsync();

            return _mapper.Map<UserShowDto>(user);
        }
    }
}
