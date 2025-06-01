import React from "react";
import Image from "next/image";

const RESTAURANT_IMG = "https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/Restaurant-interior.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9SZXN0YXVyYW50LWludGVyaW9yLmpwZyIsImlhdCI6MTc0ODY3MjY4NCwiZXhwIjoxOTA2MzUyNjg0fQ.4SXA8eWaUj_UOCYtXkIDhLzS5zcLiL6Zi7cLs_aBpBY";
const FOOD_IMG = "https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/burger.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9idXJnZXIuanBlZyIsImlhdCI6MTc0ODY3MzI2OSwiZXhwIjoxOTA2MzUzMjY5fQ.EryvkWF0ruvwsf6PVofVLctKRUDF06UYCdp_IpNHAsc";

const ProcessDemo: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-10 py-10 md:py-14 bg-[#F9FAFB] gap-8 md:gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 max-w-2xl text-center mb-4">
        <h2 className="text-[2rem] md:text-[2.25rem] font-bold text-[#111827] leading-tight">See Plately in action</h2>
        <p className="text-base md:text-lg font-bold text-[#6B7280]">From your basic photos to stunning social media posts</p>
      </div>
      {/* HEADER - Screenshot style */}
      <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto mb-8">
        <div className="flex flex-row items-center justify-center gap-3 mb-2">
          <span className="text-[#EF4444] font-bold text-xl md:text-2xl uppercase tracking-wide">BEFORE:</span>
          <span className="text-[#111827] font-bold text-xl md:text-2xl">Your Quick Photo Snaps</span>
        </div>
        <p className="text-[#6B7280] text-base md:text-lg text-center max-w-2xl">Just upload one photo of your restaurant and one of your food. Plately AI takes care of the rest.</p>
      </div>
      {/* FIVE COLUMN ROW - No card, larger images */}
      <div className="w-full max-w-[1200px] flex flex-row items-center justify-center gap-8 mb-10">
        {/* 1. Step 1: Number, Label, Description */}
        <div className="flex flex-col items-end text-right gap-2 min-w-[170px]">
          <span className="w-9 h-9 bg-blue-800 rounded-full flex items-center justify-center text-white text-base font-bold mb-1">1</span>
          <span className="font-bold text-base text-[#111827] mb-1">Restaurant Photo</span>
          <span className="text-sm text-[#6B7280] max-w-[160px]">Upload a photo of your restaurant interior or exterior. This sets the vibe for your brand!</span>
        </div>
        {/* 2. Restaurant Image with label above */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-base text-[#111827] mb-1">Restaurant Photo</span>
          <div className="w-[312px] h-[219px] bg-gray-200 border-2 border-[#E5E7EB] rounded-xl flex items-center justify-center overflow-hidden relative">
            <Image
              src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/Restaurant-interior.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9SZXN0YXVyYW50LWludGVyaW9yLmpwZyIsImlhdCI6MTc0ODgwMTU1MiwiZXhwIjoxNzgwMzM3NTUyfQ.L-5carpWOdA-M7uCbHVEo_O8NrtpLPdS7Hq-PUYRvkw"
              alt="Restaurant interior"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 312px"
              priority
            />
          </div>
        </div>
        {/* 3. Plus Icon */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="#6B7280" strokeWidth="2">
              <line x1="10" y1="4" x2="10" y2="16" />
              <line x1="4" y1="10" x2="16" y2="10" />
            </svg>
          </div>
        </div>
        {/* 4. Food Image with label above */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-base text-[#111827] mb-1">Food Photo</span>
          <div className="w-[312px] h-[219px] bg-gray-200 border-2 border-[#E5E7EB] rounded-xl flex items-center justify-center overflow-hidden relative">
            <Image
              src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/burger.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9idXJnZXIuanBlZyIsImlhdCI6MTc0ODgwMTU3NywiZXhwIjoxNzgwMzM3NTc3fQ.P6Nr1b29C52sq1QPDrhirW7gtWXBymIYVdM3Bl8ugEo"
              alt="Burger food photo"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 312px"
              priority
            />
          </div>
        </div>
        {/* 5. Step 2: Number, Label, Description */}
        <div className="flex flex-col items-start text-left gap-2 min-w-[170px]">
          <span className="w-9 h-9 bg-blue-800 rounded-full flex items-center justify-center text-white text-base font-bold mb-1">2</span>
          <span className="font-bold text-base text-[#111827] mb-1">Food Photo</span>
          <span className="text-sm text-[#6B7280] max-w-[160px]">Upload a photo of your signature dish or best-seller. This is what will make mouths water!</span>
        </div>
      </div>
      {/* Mobile Descriptions Below Images */}
      <div className="flex flex-col gap-3 w-full max-w-5xl md:hidden mb-2">
        <span className="flex items-center gap-3 text-base text-[#6B7280] justify-center leading-snug">
          <span className="w-8 h-8 bg-[#0B3954] rounded-md flex items-center justify-center text-white text-base font-bold">1</span>
          Upload a photo of your restaurant interior or exterior. This sets the vibe for your brand!
        </span>
        <span className="flex items-center gap-3 text-base text-[#6B7280] justify-center leading-snug">
          <span className="w-8 h-8 bg-[#0B3954] rounded-md flex items-center justify-center text-white text-base font-bold">2</span>
          Upload a photo of your signature dish or best-seller. This is what will make mouths water!
        </span>
      </div>
      {/* AI Divider (Pill + Arrow) */}
      <div className="flex flex-col items-center gap-1 my-2 w-full max-w-[1200px] mx-auto">
        {/* Horizontal divider with pill cutout */}
        <div className="relative w-full flex items-center justify-center" style={{ minHeight: '40px' }}>
          {/* Divider line left */}
          <div className="absolute left-0 right-1/2 flex items-center pr-[120px]">
            <div className="w-full border-t" style={{ borderColor: '#D1D5DB', borderTopWidth: '1px' }} />
          </div>
          {/* Pill */}
          <div className="relative z-10 flex items-center gap-2 bg-gradient-to-b from-purple-500 to-blue-500 px-4 py-2 rounded-full shadow mx-4" style={{background: 'linear-gradient(180deg, #8B5CF6 0%, #3B82F6 100%)'}}>
            <span className="text-white font-semibold text-sm">Plately AI Transforms</span>
            <span role="img" aria-label="sparkles">✨</span>
          </div>
          {/* Divider line right */}
          <div className="absolute right-0 left-1/2 flex items-center pl-[120px]">
            <div className="w-full border-t" style={{ borderColor: '#D1D5DB', borderTopWidth: '1px' }} />
          </div>
        </div>
        <svg width="24" height="24" fill="none" stroke="#8B5CF6" strokeWidth="2" className="mt-1"><path d="M12 4v16M12 20l-4-4M12 20l4-4"/></svg>
      </div>
      {/* AFTER Row */}
      <div className="w-full flex flex-row gap-4 md:gap-6 justify-center items-end overflow-x-auto pb-2" style={{scrollbarWidth: 'thin'}}>
        {/* Instagram Card */}
        <div className="bg-white border border-[#E5E7EB] shadow-lg rounded-2xl flex flex-col w-[320px] max-w-[363px] mx-auto min-w-[280px]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[#E5E7EB]">
            <div className="w-9 h-9 bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#fff"/><path d="M10 5.833A4.167 4.167 0 1 0 10 14.167 4.167 4.167 0 0 0 10 5.833Zm0 6.667A2.5 2.5 0 1 1 10 7.5a2.5 2.5 0 0 1 0 5Zm3.333-6.25a.833.833 0 1 1-1.667 0 .833.833 0 0 1 1.667 0Z" fill="#E1306C"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#111827] leading-tight">@restaurant</span>
              <span className="text-[11px] text-[#6B7280] leading-tight">2 hours ago</span>
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] relative overflow-hidden">
            <Image
              src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/cheddar-bacon-hamburger-1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9jaGVkZGFyLWJhY29uLWhhbWJ1cmdlci0xLmpwZyIsImlhdCI6MTc0ODY3ODU0NCwiZXhwIjoxOTA2MzU4NTQ0fQ.ls3f_id9yK7iWqIyOA_Vvefj5KFWfEMX9YwG5AjAPi8"
              alt="Cheddar bacon hamburger Instagram post"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 363px"
              priority
            />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-2 px-4 py-2">
            {/* Actions Row */}
            <div className="flex items-center gap-4 mb-1">
              {/* Heart */}
              <svg width="24" height="24" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 3.99 13.07 5.36C13.64 3.99 15.1 3 16.64 3C19.64 3 22.14 5.5 22.14 8.5C22.14 13.5 12 21 12 21Z"/></svg>
              {/* Message */}
              <svg width="24" height="24" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              {/* Send */}
              <svg width="24" height="24" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
              {/* Bookmark */}
              <svg width="24" height="24" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span className="text-xs font-semibold text-[#111827]">202 likes</span>
            <span className="text-xs text-[#111827]">This one's not shy. Bright lights, bold flavor, and zero chill. With thick-cut bacon, molten cheddar, and a burger that means business, this is the kind of bite that owns the moment—and then some.</span>
          </div>
        </div>
        {/* Facebook Card */}
        <div className="bg-white border border-[#E5E7EB] shadow-lg rounded-2xl flex flex-col w-[320px] max-w-[363px] mx-auto min-w-[280px]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[#E5E7EB]">
            <div className="w-9 h-9 bg-[#1877F3] rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#fff"/><path d="M13.5 10H11V16H8.5V10H7V7.5H8.5V6.5C8.5 5.12 9.12 4 11 4H13.5V6.5H12C11.72 6.5 11.5 6.72 11.5 7V7.5H13.5V10Z" fill="#1877F3"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#111827] leading-tight">Plately Restaurant</span>
              <span className="text-[11px] text-[#6B7280] leading-tight">Just now · <span className='inline-block align-middle'><svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280"><circle cx="12" cy="12" r="6"/></svg></span></span>
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] relative overflow-hidden">
            <Image
              src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/cheddar-bacon-hamburger-3.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9jaGVkZGFyLWJhY29uLWhhbWJ1cmdlci0zLmpwZyIsImlhdCI6MTc0ODY3ODgyMywiZXhwIjoxOTA2MzU4ODIzfQ.jMGSRxJJ-vmcPQJavM4PlgKRevmXHO8GMsuIZ-yEW24"
              alt="Cheddar bacon hamburger Facebook post"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 363px"
              priority
            />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-2 px-4 py-2">
            {/* Actions Row */}
            <div className="flex items-center gap-6 mb-1">
              {/* Like */}
              <div className="flex items-center gap-1">
                <svg width="20" height="20" fill="#1877F3" viewBox="0 0 20 20"><path d="M10 18l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.5 3.5 4 5.5 4c1.54 0 3.04 1.04 3.57 2.36h1.87C11.46 5.04 12.96 4 14.5 4 16.5 4 18 5.5 18 7.5c0 2.78-2.4 4.86-6.55 9.18L10 18z"/></svg>
                <span className="text-xs text-[#1877F3] font-semibold">Like</span>
              </div>
              {/* Comment */}
              <div className="flex items-center gap-1">
                <svg width="20" height="20" fill="#6B7280" viewBox="0 0 20 20"><path d="M18 10c0 3.31-3.13 6-7 6-1.09 0-2.13-.18-3.07-.5L2 18l1.5-4.5C2.57 12.13 2 11.11 2 10c0-3.31 3.13-6 7-6s7 2.69 7 6z"/></svg>
                <span className="text-xs text-[#6B7280] font-semibold">Comment</span>
              </div>
              {/* Share */}
              <div className="flex items-center gap-1">
                <svg width="20" height="20" fill="#6B7280" viewBox="0 0 20 20"><path d="M15 8V5a3 3 0 0 0-6 0v3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2z"/></svg>
                <span className="text-xs text-[#6B7280] font-semibold">Share</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#111827]">1.2K Likes · 300 Comments</span>
            <span className="text-xs text-[#111827]">Hello Cheddar Bacon Hamburger! Our NEW classic is a hit! Come try it this weekend and let us know what you think. 🍔</span>
          </div>
        </div>
        {/* TikTok Card */}
        <div className="bg-black rounded-2xl flex flex-col w-[320px] max-w-[363px] mx-auto min-w-[280px] text-white relative overflow-hidden" style={{height: 'auto'}}>
          {/* TikTok Image/Video */}
          <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden">
            <Image
              src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/cheddar-bacon-hamburger-2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9jaGVkZGFyLWJhY29uLWhhbWJ1cmdlci0yLmpwZyIsImlhdCI6MTc0ODY3OTA0NCwiZXhwIjoxOTA2MzU5MDQ0fQ.lIjHrFxI71a-X7WEsgn2GjYSCMo2znwxAZENf6kwZTM"
              alt="Cheddar bacon hamburger TikTok post"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, 363px"
              priority
            />
            {/* Top Center: Following | For You */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
              <span className="text-white/60 font-medium text-base">Following</span>
              <span className="text-white font-bold text-base border-b-2 border-white">For You</span>
            </div>
            {/* Bottom Left: Meta Data */}
            <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 max-w-[60%]">
              <span className="font-semibold text-white text-base">@plately.tiktok</span>
              <span className="text-white text-sm leading-snug">POV: You just found your new favorite burger spot. <span className="text-[#25F4EE]">#burger</span> <span className="text-[#FE2C55]">#foodie</span> <span className="text-[#fff]">#viral</span></span>
              <span className="flex items-center gap-2 text-white/80 text-xs"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="19" r="1" fill="#fff"/></svg> Cheryl - @Yung Gravy</span>
            </div>
            {/* Bottom Right: Actions */}
            <div className="absolute bottom-4 right-2 z-10 flex flex-col items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden mb-2">
                <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" width={48} height={48} />
              </div>
              {/* Like */}
              <div className="flex flex-col items-center">
                <svg width="28" height="28" fill="#FE2C55" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span className="text-xs font-bold text-white">1.3M</span>
              </div>
              {/* Comment */}
              <div className="flex flex-col items-center">
                <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span className="text-xs font-bold text-white">10.7M</span>
              </div>
              {/* Share */}
              <div className="flex flex-col items-center">
                <svg width="28" height="28" fill="#25F4EE" viewBox="0 0 24 24"><path d="M15 8V5a3 3 0 0 0-6 0v3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2z"/></svg>
                <span className="text-xs font-bold text-white">30.9K</span>
              </div>
              {/* Music Animation */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#25F4EE] via-[#FE2C55] to-[#fff] flex items-center justify-center mt-2">
                <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#fff" opacity="0.3"/><circle cx="12" cy="12" r="4" fill="#fff" opacity="0.9"/></svg>
              </div>
            </div>
            {/* Carousel Dots (moved above meta info, still centered) */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10 flex gap-2" style={{ bottom: '128px' }}>
              <span className="w-2 h-2 rounded-full bg-white opacity-90 block" />
              <span className="w-2 h-2 rounded-full bg-gray-400 opacity-70 block" />
              <span className="w-2 h-2 rounded-full bg-gray-400 opacity-70 block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessDemo; 