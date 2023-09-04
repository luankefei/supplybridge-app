import { FiberManualRecord, Star } from "@mui/icons-material";
import { Badge, Box, Card, Stack, useTheme } from "@mui/material";
import Layout from "components/layout";
import PoweredBy from "components/ui-components/poweredBy";
import { SpacingVertical } from "components/ui-components/spacer";
import {
  STextBody,
  STextCaption,
  STextH1,
} from "components/ui-components/text";
import { API_URL } from "config";
import { request } from "config/axios";
import { useStore } from "hooks/useStore";
import {
  EnumUserNotificationStatus,
  IUserNotification,
} from "models/userNotification";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Notification() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<IUserNotification[]>([]);
  const { setHasNotif } = useStore();
  const fetchData = async () => {
    try {
      const res = await request.get(`${API_URL}/notification/poll`);
      if (
        res.data &&
        res.data.notifications &&
        Array.isArray(res.data.notifications)
      ) {
        setNotifications(
          res.data.notifications.map((e: any) => ({
            ...e,
            createdAt: new Date(e.createdAt).toLocaleString(),
          }))
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const markAsRead = async () => {
    try {
      if (notifications.length === 0) return;
      await request.post(`${API_URL}/notification/mark-as-read`);
    } catch (error: any) {
      // do nothing...
      console.info(error);
    }
  };

  useEffect(() => {
    markAsRead();
  }, [notifications]);

  useEffect(() => {
    fetchData();
    return () => {
      setHasNotif(false);
    };
  }, []);

  const renderNotifications = () => {
    if (notifications.length === 0) {
      return (
        <>
          <Star
            sx={{
              fontSize: 50,
              color: "#E5E7EB", //"#FFC107",
            }}
          />
          <STextBody color={theme.palette.text.secondary}>
            No more notifications.
          </STextBody>
        </>
      );
    }
    return notifications.map((item, idx) => {
      return (
        <Card
          key={idx}
          component={Stack}
          p={3}
          minWidth={"66%"}
          alignItems={"flex-start"}
          mb={3}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={"row"}
            width={"100%"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              {item.status === EnumUserNotificationStatus.UNREAD && (
                <FiberManualRecord
                  color="error"
                  sx={{
                    fontSize: "8px",
                    marginRight: "8px",
                  }}
                />
              )}
              <STextBody fontSize="16px" color="#434343">
                {item.Notification.title}
              </STextBody>
            </Stack>
            <STextBody>{item.createdAt}</STextBody>
          </Stack>

          <SpacingVertical space="8px" />
          <STextBody>{item.Notification.content}</STextBody>
        </Card>
      );
    });
  };

  return (
    <Layout pageTitle="Notification">
      <Stack alignItems={"center"} p={10}>
        <STextH1>Notification Center</STextH1>
        <SpacingVertical space="8px" />
        <PoweredBy />
        <SpacingVertical space="48px" />
        {renderNotifications()}
      </Stack>
    </Layout>
  );
}
