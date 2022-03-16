import { useEffect, useState } from "react";
import DesktopTable from "./DesktopTable";
import MobileTable from "./MobileTable";

interface TableContainerProps {
  data: any[];
}

export default function TableContainer({ data }: TableContainerProps) {
  const [width, setWidth] = useState<number>();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 860;

  return (
    <>{isMobile ? <MobileTable data={data} /> : <DesktopTable data={data} />}</>
    // <>{isMobile ? <MobileTable data={data} /> : <DesktopTable data={data} />}</>
  );
}
