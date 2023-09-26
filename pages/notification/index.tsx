import { Check, FiberManualRecord, Star } from "@mui/icons-material";
import {
  Button,
  Card,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  useTheme,
} from "@mui/material";
import Layout from "components/layout";
import PoweredBy from "components/ui-components/poweredBy";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import { STextBody, STextH1 } from "components/ui-components/text";
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
  const { hasNotif, setHasNotif } = useStore();
  const [viewType, setViewType] = useState<"read" | "unread">("unread");
  const [notifications, setNotifications] = useState<IUserNotification[]>([]);
  const [displayNotifications, setDisplayNotifications] = useState<
    IUserNotification[]
  >([]);

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
      toast.error(error.messagee || "Something went wrong");
    }
  };

  useEffect(() => {
    setDisplayNotifications(
      notifications.filter((e) => {
        if (viewType === "unread") {
          return e.status === EnumUserNotificationStatus.UNREAD;
        } else {
          return e.status === EnumUserNotificationStatus.READ;
        }
      })
    );
  }, [viewType, notifications]);

  const markAsRead = async (nid?: number) => {
    try {
      if (notifications.length === 0) return;
      const url = `${API_URL}/notification/mark-as-read/${nid || ""}`;
      await request.post(`${url}`);
      setNotifications(
        notifications.map((e) => {
          if (e.notification_id === nid || nid === undefined) {
            return {
              ...e,
              status: EnumUserNotificationStatus.READ,
            };
          }
          return e;
        })
      );
      const stillUnread = notifications.filter(
        (e) => e.status === EnumUserNotificationStatus.UNREAD
      );
      setHasNotif(stillUnread.length > 0);
    } catch (error: any) {
      // do nothing...
      console.info(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  // useEffect(() => {
  //   markAsRead();
  // }, [notifications]);

  useEffect(() => {
    fetchData();
    return () => {
      // previously this is used to mark all as read and remove the badge
      // but removed now since we will be using manual mark-as-read
      // setHasNotif(false);
    };
  }, [hasNotif]);

  const renderNotifications = () => {
    if (displayNotifications.length === 0) {
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
    return displayNotifications.map((item, idx) => {
      const unread = item.status === EnumUserNotificationStatus.UNREAD;
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
              {unread && (
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
            <Stack direction={"row"} alignItems={"center"}>
              <STextBody>{item.createdAt}</STextBody>
              <SpacingHorizontal space="8px" />
              {unread && (
                <Tooltip title="Mark as read">
                  <IconButton
                    size="small"
                    onClick={() => markAsRead(item.notification_id)}
                  >
                    <Check />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
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
        <Stack
          direction={"row"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          minWidth={"66%"}
        >
          <Tabs value={viewType} onChange={(e, v) => setViewType(v)}>
            <Tab label="New" value="unread" />
            <Tab label="Read" value="read" />
          </Tabs>
          <Button sx={{ marginLeft: "16px" }} onClick={() => markAsRead()}>
            Mark all as read
          </Button>
        </Stack>
        <SpacingVertical space="48px" />

        {renderNotifications()}
      </Stack>
    </Layout>
  );
}
