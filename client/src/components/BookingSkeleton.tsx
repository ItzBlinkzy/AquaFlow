const BookingSkeleton = () => {
  const skelCount = 3;
  return (
    <div>
      {Array(skelCount)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="mx-auto mb-5 mt-3 animate-pulse px-2 md:w-1/2"
          >
            <div className="flex flex-col rounded-lg border border-slate-300 bg-slate-200 p-4 lg:p-5">
              <div className="flex justify-between py-3">
                <div className="h-6 w-1/4 bg-slate-300"></div>
                <div>
                  <div className="min-w-3/4 mb-2 h-8 bg-slate-300"></div>
                  <div className="min-w-1/2 h-6 bg-slate-300"></div>
                </div>
                <div className="h-6 w-1/4 bg-slate-300"></div>
              </div>
              <div className="flex justify-between py-3">
                <div className="h-6 w-2/3 bg-slate-300"></div>
                <div className="h-9 w-28 bg-slate-300"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookingSkeleton;
