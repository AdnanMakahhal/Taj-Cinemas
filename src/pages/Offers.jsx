import { ArrowRight } from "lucide-react";

function Offers() {
  return (
    <div className="min-h-screen text-[#FFFFFF] pt-28 px-8 max-w-7xl mx-auto ">
      <div>
        <h1 className="text-3xl font-bold mb-3">More movies. Better value.</h1>
        <p className="text-[#FFFFFF]/70 mb-5">
          Make your next cinema night even better with our latest offer.
        </p>

        <div className="w-full max-w-[1200px] h-auto md:h-[400px] flex gap-15 flex-col sm:flex-row sm:justify-between items-center px-12 py-10 overflow-hidden rounded-[18px] border border-white/[0.15] bg-[linear-gradient(90deg,#211F2B_0%,#090B11_100%)] mb-5">
          <div className="sm:mb-15 w-full md:w-auto">
            <div className="bg-[#E5E5E5]/5.5 flex items-center justify-center w-40 h-10 border border-[#FFFFFF]/13 rounded-md mb-3">
              <p>EVERY MONDAY</p>
            </div>

            <p className="text-3xl font-semibold mb-5">
              Mondays are for movies.
            </p>
            <p className="text-[#B3B3B3] text-lg mb-1">
              50% off movie tickets.
            </p>
            <p className="text-[#B3B3B3] text-lg mb-5">
              All movies. All cinemas. Every Monday.
            </p>

            <a
              className="max-w-70 md:w-auto h-15 bg-[#FFFFFF] border border-[#FFFFFF]/0 rounded-2xl text-[#0A0A0A] flex items-center gap-1 justify-center"
              href=""
            >
              Find a <span className="hidden md:block">Monday</span> showtime <ArrowRight />
            </a>
          </div>

          <div className="w-full md:w-auto max-w-[335px] h-auto md:h-[250px] flex items-center justify-center px-12 py-10 overflow-hidden rounded-[18px] border border-white/[0.15] bg-[linear-gradient(90deg,#211F2B_0%,#090B11_100%)] rotate-10">
            <div className="flex flex-col gap-1 items-center">
              <p className="font-bold text-6xl sm:text-8xl">
                50<span>%</span>
              </p>
              <p className="text-[#A6A6A6] font-semibold text-md whitespace-nowrap">
                OFF MOVIE TICKETS
              </p>
            </div>
          </div>
        </div>

        <p className="text-2xl font-semibold mb-5">
          Your Monday plans, sorted.
        </p>

        <div className="flex justify-between gap-5 mb-10 max-sm:flex-col">
          <div className="w-auto md:w-[413px] bg-[#FFFFFF]/3 border border-[#FFFFFF]/9 p-7 rounded-2xl">
            <p className="text-[#737373] text-sm font-semibold pb-3">01</p>
            <p className="text-lg font-semibold pb-2">Pick a Monday</p>
            <p className="font-normal text">
              Choose a Monday in the booking calendar.
            </p>
          </div>
          <div className="w-auto md:w-[413px] bg-[#FFFFFF]/3 border border-[#FFFFFF]/9 p-7 rounded-2xl">
            <p className="text-[#737373] text-sm font-semibold pb-3">02</p>
            <p className="text-lg font-semibold pb-2">Choose any movie</p>
            <p className="font-normal text">
              Find your movie, cinema, and showtime.
            </p>
          </div>
          <div className="w-auto md:w-[413px] bg-[#FFFFFF]/3 border border-[#FFFFFF]/9 p-7 rounded-2xl">
            <p className="text-[#737373] text-sm font-semibold pb-3">03</p>
            <p className="text-lg font-semibold pb-2">
              Enjoy half-price tickets
            </p>
            <p className="font-normal text">
              Review your 50% saving before checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
