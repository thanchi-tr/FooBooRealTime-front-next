'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  useRouter().push("/auth/login");
}

export default Page;