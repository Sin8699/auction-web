// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard Material-UI example components
import DashboardLayout from "component-pages/LayoutContainers/DashboardLayout";

import Card from "@material-ui/core/Card";


function ProductDetail() {
  return (
    <DashboardLayout>
      <SuiBox mb={3}>
        <Card>ProductDetail</Card>
      </SuiBox>
    </DashboardLayout>
  );
}

export default ProductDetail;
