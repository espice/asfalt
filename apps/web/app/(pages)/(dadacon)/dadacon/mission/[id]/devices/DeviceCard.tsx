"use client";

import { useState, useRef, useEffect } from "react";
import SecondaryButton from "@/components/SecondaryButton";
import styles from "./index.module.scss";
import { Popup } from "@/components/Popup";
import useUser from "@/utils/hooks/useUser";
import { useRouter } from "next/navigation";
import { gqlClient } from "@/utils/gql";
import { cn } from "@/utils/tw";

export default function DeviceCard({
  device,
  remove,
}: {
  device: any;
  remove: () => void;
}) {
  const [show, setShow] = useState(false);
  const popupRef = useRef(null);
  return (
    <div className={styles.container__devices__device}>
      <div className={styles.container__devices__device__text}>
        <h2 className={styles.container__devices__device__text__heading}>
          Sim #{device.id.substr(device.id.length - 5)}
        </h2>
        <h2 className={styles.container__devices__device__text__info}>
          {device.owner}
        </h2>
        <h2 className={styles.container__devices__device__text__info}>
          Location: {device.location}
        </h2>
        <h2 className={styles.container__devices__device__text__info}>
          Last Used: {device.lastAccessed}
        </h2>
      </div>
      <div className={styles.container__devices__device__uh}>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {device.suspected && (
            <>
              <h2 className={styles.container__devices__device__uh__danger}>
                Suspected of Criminal Activity
              </h2>
              <svg
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.25 16.25H13.75V8.75H16.25M16.25 21.25H13.75V18.75H16.25M15 2.5C13.3585 2.5 11.733 2.82332 10.2165 3.45151C8.69989 4.07969 7.3219 5.00043 6.16117 6.16117C3.81696 8.50537 2.5 11.6848 2.5 15C2.5 18.3152 3.81696 21.4946 6.16117 23.8388C7.3219 24.9996 8.69989 25.9203 10.2165 26.5485C11.733 27.1767 13.3585 27.5 15 27.5C18.3152 27.5 21.4946 26.183 23.8388 23.8388C26.183 21.4946 27.5 18.3152 27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7835 3.45151C18.267 2.82332 16.6415 2.5 15 2.5Z"
                  fill="#E81313"
                />
              </svg>
            </>
          )}
        </div>
        {true ? (
          <div
            className={cn(
              styles.container__devices__device__uh__button,
              "flex gap-4"
            )}
          >
            <SecondaryButton
              onClick={() => {
                setShow(true);
              }}
            >
              View Activity
            </SecondaryButton>{" "}
            <SecondaryButton
              className={styles.dangerbutton}
              onClick={async () => {
                remove();
                await gqlClient.mutation({
                  unlinkDevice: {
                    __args: {
                      deviceId: device.id,
                    },
                  },
                });
              }}
            >
              Remove
            </SecondaryButton>
          </div>
        ) : (
          <p className={styles.container__devices__device__uh__button}>
            Added to {device.mission.title}
          </p>
        )}
      </div>
      <Popup
        ref={popupRef}
        popupState={show}
        crossHandler={() => {
          setShow(false);
        }}
      >
        <ActivityPopup device={device} open={show} />
      </Popup>
    </div>
  );
}

const ActivityPopup = ({ device, open }: { device: any; open: boolean }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getLogs() {
    setLoading(true);
    const res = await gqlClient.query({
      device: {
        __args: {
          deviceId: device.id,
        },
        logs: {
          id: true,
          message: true,
          time: true,
          flagged: true,
        },
      },
    });
    setLogs(res.device.logs);
    setLoading(false);
  }

  useEffect(() => {
    if (open) {
      getLogs();
    }
  }, [open]);

  return (
    <div className={styles.popup}>
      <h1 className={styles.popup__heading}>Activity - {device.owner}</h1>
      <div className={styles.popup__flex}>
        <div className={styles.popup__flex__one}>
          <h3 className={styles.popup__flex__one__sus}>
            Suspected texts and calls
          </h3>
          <div className={styles.popup__flex__one__switcher}></div>
        </div>
        <div className={styles.popup__flex__two}>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <>
              <h2 className={styles.popup__flex__two__heading}>
                View full activity
              </h2>
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V9H16V16Z"
                  fill="#20C20E"
                />
              </svg>
            </>
          </div>
        </div>
      </div>
      <div className={styles.popup__switcher}>
        <div className={styles.popup__switcher__active}>Texts</div>
        <div className={styles.popup__switcher__switch}>Calls</div>
      </div>
      <div className={styles.popup__values}>
        {loading
          ? "Loading..."
          : logs.map((log, i) => {
              return (
                <div className={styles.popup__values__value} key={log.id}>
                  <div className={styles.popup__values__value__flex}>
                    <h1 className={styles.popup__values__value__flex__title}>
                      “{log.message}”
                    </h1>
                    <h3 className={styles.popup__values__value__flex__date}>
                      {log.time}
                    </h3>
                  </div>
                  {log.flagged ? (
                    <div
                      className={cn(
                        styles.popup__values__value__button,
                        "bg-transparent"
                      )}
                    >
                      Flagged
                    </div>
                  ) : (
                    <SecondaryButton
                      className={cn(styles.popup__values__value__button)}
                      onClick={() => {
                        const newLogs = [...logs];
                        newLogs[i] = { ...logs[i], flagged: true };
                        setLogs([...newLogs]);
                        gqlClient.mutation({
                          flagLog: {
                            __args: {
                              logId: log.id,
                              missionId: device.mission.id,
                            },
                          },
                        });
                      }}
                    >
                      Flag
                    </SecondaryButton>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};
