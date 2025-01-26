import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { InfinitScrollProps } from "./core/_props";

const InfinitScroll = <T,>({ getDate, renderItem }: InfinitScrollProps<T>) => {
  const lastElemenetrenderedRef = useRef<null | ReactNode>(null);
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<{
    page: number;
    pages: number;
    total: number;
  }>({
    page: 1,
    pages: 0,
    total: 0,
  });

  const fetchData = useCallback(() => {
    getDate(meta.page).then((response) => {
      setData((prev) => [...prev, ...response.data]);

      setMeta({
        page: response.meta.page,
        total: response.meta.total,
        pages: response.meta.pages,
      });
    });
  }, [meta.page, getDate]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data.map((elem) => {
        const renderedItem = renderItem({ row: elem });
        lastElemenetrenderedRef.current = renderedItem;
        return renderedItem;
      })}
    </div>
  );
};

export default InfinitScroll;

