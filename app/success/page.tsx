"use client";

import { Suspense } from 'react';
import { SuccessClient } from './page-client';

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
