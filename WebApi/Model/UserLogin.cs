﻿using System.ComponentModel.DataAnnotations;

namespace WebApi.Model
{
    public class UserLogin
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

    }
}
