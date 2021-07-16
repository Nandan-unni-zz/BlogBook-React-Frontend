import { Skeleton, Col, Row } from "antd";

const ProfileSkeleton = () => {
  return (
    <div className="profile">
      <div className="profile-data">
        <Skeleton.Avatar
          style={{ width: 150, height: 150, marginBottom: 20 }}
        />
        <div className="profile-dtl">
          <h3 className="profile-name">
            <Skeleton.Input active style={{ width: 200 }} />
          </h3>
          <Col>
            <p className="profile-uname">
              <Skeleton.Input active size="small" style={{ width: 200 }} />
            </p>
            <p className="profile-email">
              <Skeleton.Input active size="small" style={{ width: 200 }} />
            </p>
          </Col>
          <Row gutter={{ xs: 10, sm: 20, lg: 25 }}>
            <Col className="profile-math" align="middle">
              <p className="profile-math-count">
                <Skeleton.Input active size="small" style={{ width: 35 }} />
              </p>
              <p className="profile-math-tag">
                <Skeleton.Input active size="small" style={{ width: 70 }} />
              </p>
            </Col>
            <Col className="profile-math" align="middle">
              <p className="profile-math-count">
                <Skeleton.Input active size="small" style={{ width: 35 }} />
              </p>
              <p className="profile-math-tag">
                <Skeleton.Input active size="small" style={{ width: 70 }} />
              </p>
            </Col>
            <Col className="profile-math" align="middle">
              <p className="profile-math-count">
                <Skeleton.Input active size="small" style={{ width: 35 }} />
              </p>
              <p className="profile-math-tag">
                <Skeleton.Input active size="small" style={{ width: 70 }} />
              </p>
            </Col>
          </Row>
          <p className="profile-bio">
            <Skeleton.Input active size="small" style={{ width: 200 }} />
          </p>
        </div>
        <div className="profile-ctrl">
          <Skeleton.Button active size="large" style={{ width: 120 }} />
        </div>
      </div>
      <div className="profile-nav">
        <menu>
          <nav>
            <Skeleton.Avatar active size="small" />
            <div className="profile-nav-text">
              <Skeleton.Input
                active
                size="small"
                style={{ width: window.screen.width > 600 ? 150 : 100 }}
              />
            </div>
          </nav>

          <nav>
            <Skeleton.Avatar active size="small" />
            <div className="profile-nav-text">
              <Skeleton.Input
                active
                size="small"
                style={{ width: window.screen.width > 600 ? 150 : 100 }}
              />
            </div>
          </nav>

          <nav>
            <Skeleton.Avatar active size="small" />
            <div className="profile-nav-text">
              <Skeleton.Input
                active
                size="small"
                style={{ width: window.screen.width > 600 ? 150 : 100 }}
              />
            </div>
          </nav>
        </menu>
        <div className="profile-content">
          <div className="prof-tab-cards">
            {[1, 2, 3, 4, 5].map((key) => (
              <div className="prof-tab-card" key={key}>
                <div className="prof-tab-card-left">
                  <Skeleton.Avatar size="large" />
                  <div className="prof-tab-card-content">
                    <h3>
                      <Skeleton.Input
                        size="small"
                        active
                        style={{ width: 140 }}
                      />
                    </h3>
                  </div>
                </div>
                <Skeleton.Button active size="small" style={{ width: 60 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
