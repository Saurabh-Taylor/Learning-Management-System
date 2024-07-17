<div className="grid grid-cols-2 gap-10 py-10 relative">
<div className="space-y-5">
  <img
    className="w-3/4 h-64"
    src={state?.thumbnail?.secure_url}
    alt="thumbnail"
  />
  <div className="space-y-4">
    <div className="flex items-center justify-between tetx-xl">
      <p className="font-semibold " >
          <span className="text-yellow-500" > Total Lectures is : </span>
          {numbersOfLectures}
      </p>
    </div>
    {role === "ADMIN" || data?.subscription?.status === "ACTIVE" || true ? (
      <Button className="bg-[#0077b6] text-white hover:bg-[#005a8d] focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:ring-offset-2">
      Watch Lectures
    </Button>
    ):(
      <Button className="bg-[#0077b6] text-white hover:bg-[#005a8d] focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:ring-offset-2">
      Subscribe
    </Button>
    ) }
  </div>
</div>
<div className="space-y-2 text-xl">
  <h1 className="text-4xl font-bold text-yellow-500" >
      {title}
  </h1>
  <p className="text-yellow-500" > Course Description: </p>
  <p> {description} </p>
</div>
</div>