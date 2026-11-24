"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ open, onClose, children }) => {
  const [mounted, setMounted] = useState(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(children, document.body);
};

export default ModalPortal;
