using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace Start_Drive.API.Identity
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class RequiresClaimAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _claimType;
        private readonly string _claimValue;

        public RequiresClaimAttribute(string claimType, string claimValue)
        {
            _claimType = claimType;
            _claimValue = claimValue;
        }

        private readonly string _claimValue2;
        public RequiresClaimAttribute(string claimType, string claimValue, string claimValue2)
        {
            _claimType = claimType;
            _claimValue = claimValue;
            _claimValue2 = claimValue2;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var result1 = context.HttpContext.User.HasClaim(_claimType, _claimValue);
            if (_claimValue2 == null)
            {
                if (!result1)
                {
                    context.Result = new ForbidResult();
                }
            }
            else
            {
                var result2 = context.HttpContext.User.HasClaim(_claimType, _claimValue2);
                if (!result1 && !result2)
                {
                    context.Result = new ForbidResult();
                }
            }
        }
    }
}
