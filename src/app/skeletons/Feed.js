import { Skeleton, Space } from "antd";

const FeedSkeleton = () => {
  return (
    <div className="Blogs">
      {[1, 2].map((key) => (
        <article className="Blog" key={key}>
          <header className="Blog-Head">
            <Space>
              <Skeleton.Avatar active />
              <Skeleton.Input active style={{ width: 200 }} />
            </Space>
            <Skeleton.Button active />
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
    </div>
  );
};

export default FeedSkeleton;
