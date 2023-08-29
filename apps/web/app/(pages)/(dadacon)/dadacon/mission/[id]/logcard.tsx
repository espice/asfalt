"use client";

import { useState, useRef } from "react";
import SecondaryButton from "@/components/SecondaryButton";
import styles from "./index.module.scss";
import { cn } from "@/utils/tw";

export default function LogCard({
  log,
  remove,
}: {
  log: any;
  remove: () => void;
}) {
  return (
    <div className={styles.container__logs__log}>
      <div className={styles.container__logs__log__text}>
        <h2 className={styles.container__logs__log__text__heading}>
            {log.name}
        </h2>
        <h2 className={styles.container__logs__log__text__info}>
          Device: {log.device}
        </h2>
        <h2 className={styles.container__logs__log__text__info}>
          Owner: {log.owner}
        </h2>
        <h2 className={styles.container__logs__log__text__info}>
          Time: {log.lastAccessed}
        </h2>
      </div>
      <div className={styles.container__logs__log__uh}>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            alignItems: "center",
            gap: "8px",
          }}
        >
            <>
              <h2 className={styles.container__logs__log__uh__danger}>
                View full conversation
              </h2>
              <svg width="12px" height="12px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V9H16V16Z" fill="#20C20E"/>
            </svg>
            </>
        </div>
        {!log.mission ? (
          <div
            className={cn(
              styles.container__logs__log__uh__button,
              "flex gap-4"
            )}
          >
            <SecondaryButton onClick={() => {}}>Mark as Safe</SecondaryButton>{" "}
          </div>
        ) : (
          <p className={styles.container__logs__log__uh__button}>
            Added to {log.mission.title}
          </p>
        )}
      </div>
    </div>
  );
}