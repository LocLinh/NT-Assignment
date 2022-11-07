

namespace CustomersView.Middleware
{
    public class JWTInHeaderMiddleware
    {
        private readonly RequestDelegate _next;

        public JWTInHeaderMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var cookieKey = "JwtToken";
            var cookie = context.Request.Cookies[cookieKey];

            if (cookie != null)
            {
                if (!context.Request.Headers.ContainsKey("Authorization"))
                {
                    context.Request.Headers.Append("Authorization", "Bearer" + cookie);
                }    
            }

            await _next.Invoke(context);
        }
    }
}
