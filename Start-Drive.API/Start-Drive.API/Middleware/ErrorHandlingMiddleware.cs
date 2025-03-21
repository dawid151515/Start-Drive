namespace Start_Drive.API.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        //context - our database, next - next middleware
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                //next we refer to the next middleware to which we pass the context, and since it is asynchronous, we add await to the async function
                await next.Invoke(context);
            }
            catch (DirectoryNotFoundException notFoundException)
            {
                //here we catch notFoundException

                //that is, if there is no resource, an exception will be thrown in the service, it will not be passed to the controller,
                //but this exception will be caught by our error handling class and handled

                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch(Exception e)
            {

                //error handling for the client so that it knows what happened, so we will write a response status code and reply to the client
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Something went wrong"+" --- "+e.GetType().Name);
            }
        }
    }
}
