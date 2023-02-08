import { useRouter } from "next/router";

import StorageService from "services/storage";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const { token } = StorageService.getAuthData();
  
      if (!token) {
        Router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;