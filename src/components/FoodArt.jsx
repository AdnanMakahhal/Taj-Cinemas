export default function FoodArt({ type, className = "" }) {
  const popcorn = <g><path d="M48 88L62 166H112L126 88Z" fill="#c94d50" /><path d="M57 90L65 163H79L74 90M96 90L91 163H106L115 90" fill="#fae9d1" /><path d="M48 91C25 73 39 52 59 53C49 23 80 16 89 35C107 12 137 24 131 53C157 50 166 79 145 91Z" fill="#f2d58d" /></g>;
  const drink = <g><path d="M120 87L125 158H150L156 87Z" fill="#91acba" /><path d="M133 87L142 50H161" stroke="#dbe4e8" strokeWidth="4" fill="none" /></g>;
  return <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    {type === "popcorn" && popcorn}
    {type === "combo" && <g transform="translate(-8 0)">{popcorn}{drink}</g>}
    {type === "drink" && <g transform="translate(-66 -14) scale(1.2)"><path d="M125 92L131 170H163L169 92Z" fill="#91acba" /><path d="M120 92H174M146 92L155 58H172" stroke="#dbe4e8" strokeWidth="5" fill="none" /></g>}
    {type === "water" && <g><rect x="87" y="35" width="26" height="17" rx="4" fill="#91acba" /><path d="M88 48V66L78 82V157Q78 168 89 168H111Q122 168 122 157V82L112 66V48Z" fill="#afcbd5" /><path d="M78 101H122V129H78Z" fill="#486775" /></g>}
    {type === "nachos" && <g><path d="M40 141L82 63L123 141Z" fill="#e9af5b" /><path d="M95 147L132 76L169 147Z" fill="#f2c777" /></g>}
    {type === "chocolate" && <g><rect x="43" y="66" width="114" height="83" rx="9" fill="#75443b" /><path d="M82 66V149M119 66V149M43 107H157" stroke="#4c2c26" strokeWidth="7" /></g>}
  </svg>;
}
