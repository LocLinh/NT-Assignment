﻿using AutoMapper;
using WebApi.Dto;
using WebApi.Model;

namespace WebApi.Mapper
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration()
        {
            CreateMap<Products, ProductDtoGet>()
                .ForMember(dest => dest.Name, otp => otp.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, otp => otp.MapFrom(src => src.Description))
                .ForMember(dest => dest.CategoryId, otp => otp.MapFrom(src => src.Categories.Id))
                .ForMember(dest => dest.CategoryName, otp => otp.MapFrom(src => src.Categories.Name))
                .ForMember(dest => dest.Price, otp => otp.MapFrom(src => src.Price))
                .ForMember(dest => dest.DiscountPercent, otp => otp.MapFrom(src => src.DiscountPercent))
                .ReverseMap();
        }
    }
}