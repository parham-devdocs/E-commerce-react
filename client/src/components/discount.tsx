import React from 'react'
import TimerBox from './timerBox'

const Discount = () => {
  return (
    <div className=" w-full  h-full bg-gradient-to-b from-red-500 to-red-600 
    text-white rounded-xl shadow-lg overflow-hidden xl:flex flex-col">

<div className="p-4 text-center border-b border-red-400/70 mx-10">
<h3 className="text-lg font-bold">🔥 تخفیف ویژه!</h3>
<p className="text-xs opacity-90 mt-1">فقط برای امروز</p>
</div>

<div className="flex justify-center my-4 space-x-2 space-x-reverse">
<TimerBox value={20}  />
<TimerBox value={20} />
<span className="text-2xl font-bold my-auto">:</span>
<TimerBox value={20} />
<TimerBox value={40} />
</div>

<div className="px-4 text-center mt-2 text-sm opacity-90">
<p>همین حالا خرید کنید و از تخفیف ویژه استفاده نمایید!</p>
</div>

</div>  )
}

export default Discount