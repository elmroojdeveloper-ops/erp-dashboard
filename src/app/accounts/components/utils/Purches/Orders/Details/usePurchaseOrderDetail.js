"use client";

import { useEffect, useState } from "react";
import {
  fetchPurchaseOrderDetail,
  getPurchaseOrderDetail,
} from "./mock-data";

/**
 * جاهز للـ API: غيّر `useMock` إلى false ومرّر `fetchPurchaseOrderDetail` كما هو.
 */
export function usePurchaseOrderDetail(id, { useMock = true } = {}) {
  const [data, setData] = useState(() =>
    useMock ? getPurchaseOrderDetail(id) : null
  );
  const [loading, setLoading] = useState(!useMock);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (useMock) {
      setData(getPurchaseOrderDetail(id));
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchPurchaseOrderDetail(id, { signal: controller.signal })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [id, useMock]);

  return { data, loading, error };
}