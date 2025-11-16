import { clsx } from "clsx";
import { Link } from "react-router-dom";
import { type VariantProps } from "tailwind-variants/lite";
import { button } from "../components/tailwindTypes";

interface ButtonProps {
  style?: VariantProps<typeof button>;
  btn?: {
    type:"button"|"submit"
    text: string;
    fn?: (e?: any) => void;
  };
  link?: {
    text: string;
    href: string;
  };
}

const Button = ({ style, btn, link }: ButtonProps) => {
  if (link) {
    return (
      <Link className={clsx(button(style), "cursor-pointer")} to={link.href}>
        {link.text}
      </Link>
    );
  }
  if (btn) {
    return (
      <button type={btn.type || "button"} onClick={btn.fn} className={clsx(button(style), "cursor-pointer")}>
        {btn.text}
      </button>
    );
  }
  return null; 
};

export default Button;