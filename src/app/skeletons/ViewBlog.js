import { Skeleton, Space } from "antd";

const ViewBlogSkeleton = () => {
  return (
    <div className="Blogs">
      <article className="Blog">
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
    </div>
  );
};

export default ViewBlogSkeleton;
