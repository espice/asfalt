"use client"

import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Fira_Code } from 'next/font/google';

const fira = Fira_Code({ subsets: ["latin"] });

const cx = classNames.bind(styles);

import React, { useEffect, useCallback } from 'react';
import ClientOnlyPortal from './ClientOnlyPortal';

export default function useOnClickOutside(ref: any, handler: Function) {
  const escapeListener = useCallback(
    (e: any) => {
      if (e.key === 'Escape') {
        handler(e);
      }
    },
    [handler]
  );
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    document.addEventListener('keyup', escapeListener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [ref, handler, escapeListener]);
}

type Props = {
    children?: any,
    heading1?: any,
    heading2?: any,
    popupState?: any,
    className?: any,
    crossHandler?: any,
    noPadding?: any,
    center?: any,
    style?: any,
}

const Popup = React.forwardRef((props: any, ref) => {
  const {
    children,
    heading1,
    heading2,
    popupState,
    className,
    crossHandler,
    noPadding = false,
    center = false,
    style,
    noShowCross,
    ...others
  } = props;

  return (
    <ClientOnlyPortal selector='#popupContainer'>
      <div
        className={cx(styles['popup-overlay'], {
          [styles['popup-overlay--open']]: popupState,
          
        },)}
      />
      <div
        className={cx(styles.popup, className, {
          [styles['popup--open']]: popupState,
          [styles['popup--no-padding']]: noPadding,
          [styles['popup--center']]: center,
        },  fira.className)}
        ref={ref}
        style={props.style ? props.style : {}}
        {...others}
      >
        <div className={styles.dots}>
          <div className={styles.dots__dot1}></div>
          <div className={styles.dots__dot2}></div>
          <div className={styles.dots__dot3}></div>
          <div className={styles.dots__dot4}></div>
        </div>
        {noShowCross ? null : (
            <div className={styles.ok}>
          <svg
            onClick={(e) => {
              crossHandler();
            }}
            width='28'
            height='28'
            viewBox='0 0 49 49'
            className={styles.popup__cross}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='13.5029'
              y='37.544'
              width='4.19178'
              height='14.9041'
              transform='rotate(-135 13.5029 37.544)'
              fill='#20C20E'
              fill-opacity='1'
            />
            <rect
              x='27.0054'
              y='24.0414'
              width='4.19178'
              height='14.9041'
              transform='rotate(-135 27.0054 24.0414)'
              fill='#20C20E'
              fill-opacity='1'
            />
            <rect
              x='24.0415'
              y='27.0053'
              width='4.19178'
              height='14.9041'
              transform='rotate(-45 24.0415 27.0053)'
              fill='#20C20E'
              fill-opacity='1'
            />
            <rect
              x='10.5391'
              y='13.5027'
              width='4.19178'
              height='14.9041'
              transform='rotate(-45 10.5391 13.5027)'
              fill='#20C20E'
              fill-opacity='1'
            />
            <rect
              x='21.0776'
              y='24.0414'
              width='4.19178'
              height='4.19178'
              transform='rotate(-45 21.0776 24.0414)'
              fill='#20C20E'
              fill-opacity='1'
            />
          </svg>
          </div>
        )}
        {heading1 ? (
          <h1 className={styles.popup__heading}>
            {heading1}
            <br />
            {heading2}
          </h1>
        ) : null}
        {children}
      </div>
    </ClientOnlyPortal>
  );
});

export { Popup, useOnClickOutside };