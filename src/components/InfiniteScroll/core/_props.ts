import React from "react";

export type InfinitScrollProps<T> = {
  renderItem: React.FC<{ row: T }>;
  getDate: (page: number) => Promise<{
    data: T[];
    meta: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>;
};

