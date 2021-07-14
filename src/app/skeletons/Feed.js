import { Skeleton, Space } from "antd";

const FeedSkeleton = () => {
  return (
    <div className="Blogs">
      {[1, 2].map((key) => (
        <div className="Blog" key={key}>
          <div className="Blog-Head">
            <Space>
              <Skeleton.Avatar active />
              <Skeleton.Input active style={{ width: 200 }} />
            </Space>
            <Skeleton.Button active />
          </div>
          <div className="Blog-Body">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
          <div className="Blog-Nav">
            <Skeleton.Button active shape="circle" />
            <Skeleton.Button active shape="circle" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSkeleton;
