// deno-lint-ignore-file no-explicit-any no-undef
import { React, ReactDOM } from "./_deps.tsx";
import { classnames } from "./_utils.tsx";

interface PopoverProps {
  content: React.ReactNode;
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end";
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

const hoverMap: Record<string, boolean> = {};

export const Popover: React.FC<PopoverProps> = ({
  content,
  placement = "top",
  className,
  style,
  children,
  onClick,
}) => {
  const [hover, setHover] = React.useState(false);
  const popoverRootId = "popover-root-" +
    React.useMemo(() => Math.random().toString().slice(2), []);
  const [topLeft, setTopLeft] = React.useState({
    top: 0,
    left: 0,
  });

  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const measuredRef = React.useCallback(
    (node) => {
      if (node !== null) {
        const { top, left, right, bottom } = node.getBoundingClientRect();
        setTopLeft({
          top: (window as any).pageYOffset +
            (placement.startsWith("top") ? top : bottom),
          left: (window as any).pageXOffset +
            (placement.endsWith("start")
              ? left
              : placement.endsWith("end")
              ? right
              : (left + right) / 2),
        });
      }
    },
    [hover],
  );

  const onMouseEnter = React.useCallback(() => {
    hoverMap[popoverRootId] = true;
    setHover(true);
  }, []);
  const onMouseLeave = React.useCallback(() => {
    hoverMap[popoverRootId] = false;
    setTimeout(() => {
      if (hoverMap[popoverRootId]) {
        return;
      }
      hoverMap[popoverRootId] = false;
      setHover(false);
    }, 300);
  }, []);

  let validChildren;

  const props = {
    ref: measuredRef,
    onMouseEnter,
    onMouseLeave,
    onClick,
  };

  if (React.isValidElement(children)) {
    validChildren = React.cloneElement(children, props);
  } else {
    validChildren = <span {...props}>{children}</span>;
  }

  return (
    <>
      {content && (
        <PopoverPortal
          popoverRootId={popoverRootId}
          content={content}
          placement={placement}
          style={{
            display: hover ? "block" : "none",
            top: topLeft.top,
            left: topLeft.left,
            ...style,
          }}
          className={className}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}
      {validChildren}
    </>
  );
};

const PopoverPortal: React.FC<
  PopoverProps & {
    popoverRootId: string;
  }
> = (
  {
    popoverRootId,
    content,
    placement = "top",
    className,
    style,
    onMouseEnter,
    onMouseLeave,
  },
) => {
  if (window.Deno) {
    return null;
  }
  // @ts-ignore need for parse
  let popoverRoot = document.getElementById(popoverRootId);
  if (!popoverRoot) {
    // @ts-ignore need for parse
    popoverRoot = document.createElement("div");
    popoverRoot.id = popoverRootId;
    // @ts-ignore need for parse
    document.body.appendChild(popoverRoot);
  }
  return ReactDOM.createPortal(
    <div
      className={classnames(className, "popover")}
      style={{
        transform: `translate(${
          placement.endsWith("start")
            ? "0"
            : placement.endsWith("end")
            ? "-100%"
            : "-50%"
        }, ${placement.startsWith("top") ? "-100%" : "0%"})`,
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </div>,
    popoverRoot,
  );
};

export default Popover;
