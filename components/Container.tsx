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
  defaultClasses = "2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto w-full lg:px-[86px] md:px-[48px] sm:px-[24px] px-[16px]",
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
