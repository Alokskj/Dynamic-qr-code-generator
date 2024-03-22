const asyncHandler = (fn) => async function(req,res,next){
    try {
        await fn(req,res,next)
    } catch (error) {
        next(error)
    }
}

export default asyncHandler