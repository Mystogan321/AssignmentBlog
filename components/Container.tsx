import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";
type IProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: React.ReactNode;
  defaultClasses?: string;
};
const Container: React.FC<IProps> = ({
  children,
  defaultClasses = " mx-auto w-full lg:px-[80px] md:px-[40px] px-[20px]",
  className,
  ...rest
}) => {
  return (
    <div className={classNames(defaultClasses, className)} {...rest}>
      {children}
    </div>
  );
};
export default Container;
