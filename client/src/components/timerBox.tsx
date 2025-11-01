
const TimerBox = ({ value }: { value: number }) => (
    <div className="flex flex-col items-center">
      <div className="bg-red-700/50 w-8 h-10 rounded flex items-center justify-center
                      text-xl font-bold border border-red-400/30">
        {value}
      </div>
    </div>
  );

  
  export default TimerBox