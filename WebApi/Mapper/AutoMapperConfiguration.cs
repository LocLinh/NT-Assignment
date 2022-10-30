using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dto;
using WebApi.Model;

namespace WebApi.Mapper
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration()
        {
            CreateMap<Products, ProductDtoGet>()
                .ForMember(dest => dest.Id, otp => otp.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, otp => otp.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, otp => otp.MapFrom(src => src.Description))
                .ForMember(dest => dest.CategoryId, otp => otp.MapFrom(src => src.CategoryId))
                .ForMember(dest => dest.CategoryName, otp => otp.MapFrom(src => src.Categories.Name))
                .ForMember(dest => dest.Price, otp => otp.MapFrom(src => src.Price))
                .ForMember(dest => dest.DiscountPercent, otp => otp.MapFrom(src => src.DiscountPercent))
                .ForMember(dest => dest.ImagePath, otp => otp.MapFrom(src => src.ImagePath));

            CreateMap<Users, UserDtoGet>()
                .ForMember(dest => dest.Username, otp => otp.MapFrom(src => src.Username))
                .ForMember(dest => dest.Email, otp => otp.MapFrom(src => src.Email))
                .ForMember(dest => dest.FirstName, otp => otp.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, otp => otp.MapFrom(src => src.LastName))
                .ForMember(dest => dest.PhoneNumber, otp => otp.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Address, otp => otp.MapFrom(src => src.Address))
                .ForMember(dest => dest.Role, otp => otp.MapFrom(src => src.Role));

            CreateMap<UserDtoPost, Users>()
                .ForMember(dest => dest.Username, otp => otp.MapFrom(src => src.Username))
                .ForMember(dest => dest.Email, otp => otp.MapFrom(src => src.Email))
                .ForMember(dest => dest.FirstName, otp => otp.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, otp => otp.MapFrom(src => src.LastName))
                .ForMember(dest => dest.PhoneNumber, otp => otp.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Address, otp => otp.MapFrom(src => src.Address))
                .ForMember(dest => dest.Password, otp => otp.MapFrom(src => src.Password))
                .ForMember(dest => dest.Role, otp => otp.MapFrom(src => "Customer"));
        }
    }
}
