import { Skeleton, Space } from "antd";

const FeedSkeleton = () => {
  return (
    <>
      {[1, 2].map((key) => (
        <article className="Blog" key={key}>
          <header className="Blog-Head">
            <Space>
              <Skeleton.Avatar active />
              <Skeleton.Input
                active
                style={{ width: window.screen.width > 700 ? 200 : 120 }}
              />
            </Space>
            <Skeleton.Button
              active
              style={{ width: window.screen.width > 700 ? 100 : 50 }}
            />
          </header>
          <div className="Blog-Body">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
          <footer className="Blog-Nav">
            <Skeleton.Button active shape="circle" />
            <Skeleton.Button active shape="circle" />
          </footer>
        </article>
      ))}
    </>
  );
};

export default FeedSkeleton;
