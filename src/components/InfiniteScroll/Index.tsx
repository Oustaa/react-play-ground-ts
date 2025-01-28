import { useCallback, useEffect, useRef, useState } from "react";
import { InfinitScrollProps } from "./core/_props";
import UsersCard from "../Dommy/UserCard";

const InfinitScroll = <T,>({ getDate, renderItem }: InfinitScrollProps<T>) => {
  const observer = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);

  const lastItemRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entires) => {
        if (entires[0].isIntersecting && hasMore) {
          setLoading(true);
          getDate(page)
            .then((newItems) => {
              setData((prev) => [...prev, ...newItems.data]);
              if (newItems.data.length === 0) {
                setHasMore(false);
              }
              setPage((prev) => prev + 1);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, page]
  );

  useEffect(() => {
    setLoading(true);

    getDate(page)
      .then((newItems) => {
        setData((prev) => [...prev, ...newItems.data]);
        if (newItems.data.length === 0) {
          setHasMore(false);
        }
        setPage((prev) => prev + 1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {data.map((elem, index) => {
        // const renderedItem = renderItem({ row: elem });
        // lastElemenetrenderedRef.current = renderedItem;
        return (
          <div
            ref={index === data.length - 1 ? lastItemRef : null}
            key={elem.id}
            className="user_card-container"
          >
            <img className="user_card-avatar" src={elem.img_url} alt="" />
            <div className="user_card-info">
              <h3>{elem.fullname}</h3>
              <p>{elem.email}</p>
            </div>
          </div>
        );
      })}
      {hasMore && loading && (
        <div>
          <h2>Loading data</h2>
        </div>
      )}
    </div>
  );
};

export default InfinitScroll;

