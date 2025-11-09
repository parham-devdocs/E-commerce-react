import { clsx } from "clsx";
import {Link } from "react-router-dom";
import { type VariantProps  } from "tailwind-variants/lite";
import { button } from "../components/tailwindTypes";
const Button = ({style,btn,link}:{style?:VariantProps<typeof button>,btn?:{text:string,fn:(e?:any)=>void},link?:{text:string,href:string}}) => {
if (link) {
    return <Link className={clsx(button(style)," cursor-pointer")}   to={link.href}>{link.text}</Link>
}
if (btn) {
    return <button  onClick={btn.fn} className={clsx(button(style)," cursor-pointer")}>{btn.text}</button>;
}}

export default Button