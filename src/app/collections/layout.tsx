"use client";
import { Box } from "@mui/material";
import CollectionSidebar from "@/components/collections/CollectionSidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCollections } from "@/store/slices/collectionsSlice";
import { useGetCollectionsQuery } from "@/store/api/collectionsApi";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { data: collections, isSuccess } = useGetCollectionsQuery();

  useEffect(() => {
    if (isSuccess && collections) {
      dispatch(setCollections(collections));
    }
  }, [collections, isSuccess, dispatch]);

  return <>{children}</>;
}
