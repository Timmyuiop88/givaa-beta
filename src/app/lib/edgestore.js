"use client";
import { createEdgeStoreProvider } from "@edgestore/react";

const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider({
  maxConcurrentUploads: 2,
});

export { EdgeStoreProvider, useEdgeStore }; 