// @material-ui core components
import Grid from "@material-ui/core/Grid";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Data
import SuiTypography from "components/SuiTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Card from "@material-ui/core/Card";
import SuiButton from "components/SuiButton";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import SuiPagination from "../../components/SuiPagination/index";

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  return (
    <DashboardLayout>
      <SuiBox mb={3}>
        <Card>
          <SuiBox pt={2} px={2}>
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Product
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography
                variant="button"
                fontWeight="regular"
                textColor="text"
              >
                <>
                  <SuiButton
                    variant="gradient"
                    buttonColor="error"
                    onClick={handleOpenMenu}
                  >
                    Category
                    <Icon className="material-icons-round font-bold">
                      keyboard_arrow_down
                    </Icon>
                  </SuiButton>
                  <Menu
                    anchorEl={openMenu}
                    getContentAnchorEl={null}
                    open={Boolean(openMenu)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleCloseMenu}>C1</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>C2</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>C3</MenuItem>
                  </Menu>
                </>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="project #2"
                  title="modern"
                  description="As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that every person has his or her own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="project #3"
                  title="minimalist"
                  description="Different people have different taste, and various types of music."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team4, name: "Peterson" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team1, name: "Elena Morison" },
                  ]}
                />
              </Grid>
            </Grid>

            <SuiPagination variant="info">
              <SuiPagination item>
                <Icon className="material-icons-round font-bold">
                  chevron_left
                </Icon>
              </SuiPagination>
              <SuiPagination active item>1</SuiPagination>
              <SuiPagination item>2</SuiPagination>
              <SuiPagination item>3</SuiPagination>
              <SuiPagination item>
                <Icon className="material-icons-round font-bold">
                  chevron_right
                </Icon>
              </SuiPagination>
            </SuiPagination>
          </SuiBox>
        </Card>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
