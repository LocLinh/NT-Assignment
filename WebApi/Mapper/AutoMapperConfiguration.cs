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
                .ForMember(dest => dest.CategoryName, otp => otp.MapFrom(src => src.Categories.Name));

            CreateMap<Users, UserDtoGet>();

            CreateMap<UserDtoPost, Users>()
                .ForMember(dest => dest.Role, otp => otp.MapFrom(src => "Customer"));

            CreateMap<CommentDtoPost, Comments>();
        }
    }
}
