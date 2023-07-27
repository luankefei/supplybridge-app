import { useEffect, useState } from "react";
import Layout from "components/layout";
import { useStore } from "hooks/useStore";
import { TSupplierModel } from "models/supplier";
import { useRouter } from "next/router";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { SText } from "components/ui-components/text";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import General from "components/scout/scoutByIndex/detailPanel/tabPanes/general";
import Portfolio from "components/scout/scoutByIndex/detailPanel/tabPanes/portfolio";
import RoundImage from "components/ui-components/roundImage";
import VerifiedSupplierChip from "components/ui-components/verifiedSupplierChip";
import { BadgeType, SupBadge } from "components/ui-components/supBadge";
import Innovation from "components/scout/scoutByIndex/detailPanel/tabPanes/innovation";
import Certificaiton from "components/scout/scoutByIndex/detailPanel/tabPanes/certification";
import Ratings from "components/scout/scoutByIndex/detailPanel/tabPanes/ratings";

export default function Compare() {
  const router = useRouter();
  const { query } = router;
  const { suppliers } = useStore.getState();
  const [suppliersToCompare, setSuppliersToCompare] = useState<
    TSupplierModel[]
  >([]);

  useEffect(() => {
    const suppliersToCompare = query.suppliers;
    if (suppliersToCompare === undefined || suppliersToCompare === "") {
      // Nothing to do here
      router.push("/scout");
      return;
    }
    const suppliersToCompareArray = Array.isArray(suppliersToCompare)
      ? suppliersToCompare
      : suppliersToCompare.split(",");

    const result: TSupplierModel[] = [];
    suppliers.forEach((supplier) => {
      if (suppliersToCompareArray.includes(String(supplier.id))) {
        result.push(supplier);
      }
    });

    console.log(suppliersToCompare);
    setSuppliersToCompare(result);
  }, [query, router, suppliers]);

  return (
    <Layout pageTitle="Compare">
      <Stack p={"48px 24px"}>
        <Box data-id="back-button" display={"flex"} justifyContent={"start"}>
          <Link href={"/scout"}>
            <Box display={"flex"} alignItems={"center"}>
              <ArrowBack
                sx={{
                  width: "20px",
                  color: "#9CA3AF",
                }}
              />
              <SpacingHorizontal space="8px" />
              <SText fontSize="14px" fontWeight="400" color="#9CA3AF">
                Back
              </SText>
            </Box>
          </Link>
        </Box>
        <SpacingVertical space="24px" />
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <SText fontSize="24px" color="#1F2937">
            Compare Suppliers
          </SText>
        </Box>
        <SpacingVertical space="24px" />
        <Box
          data-id="view-box"
          width={"100%"}
          overflow={"auto"}
          display={"flex"}
          flexWrap={"nowrap"}
        >
          {suppliersToCompare.map((supplier) => (
            <Stack
              key={supplier.id}
              flexShrink={0}
              flexBasis="33%"
              display={"flex"}
              p={3}
              m={1}
              bgcolor={"#fff"}
              borderRadius={"16px"}
              alignContent={"center"}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <RoundImage src={supplier.logo} size={52} />
                <SpacingHorizontal space="8px" />
                <SText fontSize="24px">{supplier.name}</SText>
                <SpacingHorizontal space="8px" />
                <VerifiedSupplierChip />
                <SpacingHorizontal space="8px" />
                <SupBadge badge={BadgeType.major} />
              </Stack>
              <SpacingVertical space="24px" />
              <Box height={"50vh"}>
                <General data={supplier} />
              </Box>
              <Box height={"20vh"}>
                <Portfolio data={supplier} />
              </Box>
              <Box height={"30vh"}>
                <Innovation data={supplier} />
              </Box>
              <Box height={"20vh"}>
                <Certificaiton data={supplier} />
              </Box>
              <Box height={"20vh"}>
                <Ratings data={supplier} />
              </Box>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Layout>
  );
}
