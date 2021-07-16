import { Skeleton } from "antd";

const UpdateBlogSkeleton = () => {
  return (
    <>
      <Skeleton.Input
        active
        style={{ width: "90vw", marginBottom: 30 }}
        size="large"
      />
      <Skeleton.Input active style={{ width: "90vw", marginBottom: 10 }} />
      <Skeleton.Input active style={{ height: 360, width: "90vw" }} />
    </>
  );
};

export default UpdateBlogSkeleton;
