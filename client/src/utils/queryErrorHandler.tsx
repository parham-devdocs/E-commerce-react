import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const queryErrorHandler = (error:AxiosError<unknown, any>) => {
    console.error("Registration error:", error);

      let message = "خطایی در ثبت‌نام رخ داد";

      if (error.response?.data && typeof error.response.data === "object") {
        const responseData = error.response.data;

        if ("data" in responseData && responseData.data) {
          const innerData = responseData.data;

          if (typeof innerData === "object") {
            if ("message" in innerData) {
              const msg = (innerData as any).message;
              if (typeof msg === "string") {
                message = msg;
              } else if (Array.isArray(msg) && msg.length > 0) {
                message = msg[0];
              }
            } else if ("error" in innerData && typeof (innerData as any).error === "string") {
              message = (innerData as any).error;
            }
          }
        }
        else if ("message" in responseData) {
          const msg = (responseData as any).message;
          if (typeof msg === "string") {
            message = msg;
          } else if (Array.isArray(msg) && msg.length > 0) {
            message = msg[0];
          }
        }
        else if ("error" in responseData && typeof (responseData as any).error === "string") {
          message = (responseData as any).error;
        }
      } else if (typeof error.response?.data === "string") {
        // Rare: raw string error
        message = error.response.data;
      } else if (error.message) {
        message = error.message;
      }

      toast.error(message);
}

export default queryErrorHandler